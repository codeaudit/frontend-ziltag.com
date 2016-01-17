import path from 'path'

import Koa from 'koa'
import staticCache from 'koa-static-cache'
import polyfill from 'koa-convert'
import httpProxy from 'http-proxy'
import http from 'http'
import https from 'https'
import fs from 'fs'
import forceSSL from 'koa-force-ssl'
import React from 'react'
import ReactDOM from 'react-dom/server'
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import {ReduxRouter} from 'redux-router'
import {reduxReactRouter, match} from 'redux-router/server'
import createHistory from 'history/lib/createMemoryHistory'
import effects from 'redux-effects'
import fetch from 'redux-effects-fetch'

import reducer from './reducer'
import routes from './route'

import {NODE_ENV, NODE_PORT, SSL_PORT, SSL_KEY, SSL_CERT, RAILS_ADDR, PLUGIN_ADDR} from '../env'

var SSL_OPTOINS = {
  key: fs.readFileSync(SSL_KEY),
  cert: fs.readFileSync(SSL_CERT)
}

const app = new Koa()

const railsProxy = httpProxy.createProxyServer({
  target: RAILS_ADDR,
  secure: NODE_ENV != 'dev'
})

const githubProxy = httpProxy.createProxyServer({
  target: PLUGIN_ADDR,
  secure: NODE_ENV != 'dev',
  changeOrigin: true,
  ignorePath: true
})

// TODO: https://github.com/nodejitsu/node-http-proxy/issues/839
githubProxy.on('proxyReq', (proxyReq, req, res, options) => {
  if (proxyReq.path != '/') {
    proxyReq.path = proxyReq.path.replace(/\/$/, '')
  }
})

if (NODE_ENV == 'dev') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('koa-webpack-dev-middleware')
  const webpackHotMiddleware = require('koa-webpack-hot-middleware')
  const webpack_config = require('../webpack/dev.config.babel')
  const compiler = webpack(webpack_config)

  app.use(polyfill(webpackDevMiddleware(compiler, {
    publicPath: webpack_config.output.publicPath
  })))

  app.use(polyfill(webpackHotMiddleware(compiler)))
} else {
  require('babel-polyfill')
}

app.use(polyfill(forceSSL(SSL_PORT)))

app.use(polyfill(staticCache(path.join(__dirname, 'public'), {
  prefix: '/public'
})))

app.use(async (ctx, next) => {
  if (ctx.req.url == '/plugin.js') {
    githubProxy.web(ctx.req, ctx.res)
    ctx.respond = false
  } else if (!ctx.req.url.match(/^\/(ziltags|ziltag_maps)\/.*/)) {
    railsProxy.web(ctx.req, ctx.res)
    ctx.respond = false
  } else {
    const store = compose(
      reduxReactRouter({getRoutes: () => routes, createHistory}),
      applyMiddleware(effects, fetch)
    )(createStore)(reducer)

    store.dispatch(match(ctx.request.originalUrl,
      (error, redirectLocation, routerState) => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter/>
          </Provider>
        )

        ctx.body = ('<!doctype html>\n<script src="/public/main.bundle.js"></script>' +
          ReactDOM.renderToString(
            <div id="react-content" dangerouslySetInnerHTML={{__html: ReactDOM.renderToString(component)}}/>
          )
        )
      })
    )
  }
})

http.createServer(app.callback()).listen(NODE_PORT)
https.createServer(SSL_OPTOINS, app.callback()).listen(SSL_PORT)