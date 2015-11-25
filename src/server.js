import path from 'path'

import Koa from 'koa'
import staticCache from 'koa-static-cache'
import polyfill from 'koa-convert'
import httpProxy from 'http-proxy'
import React from 'react'
import ReactDOM from 'react-dom/server'
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import {ReduxRouter} from 'redux-router'
import {reduxReactRouter, match} from 'redux-router/server'
import createHistory from 'history/lib/createMemoryHistory'
import effects from 'redux-effects'
import fetch from 'redux-effects-fetch'

import clientMiddleware from './middleware/clientMiddleware'
import transitionMiddleware from './middleware/transitionMiddleware'
import reducer from './reducer'
import routes from './route'


const app = new Koa()
const proxy = httpProxy.createProxyServer()

if (process.env.NODE_ENV == 'dev') {
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

app.use(polyfill(staticCache(path.join(__dirname, 'public'), {
  prefix: '/public'
})))


app.use(async (ctx, next) => {
  if (!ctx.req.url.match(/^\/(ziltags|ziltag_maps)\/.*/)) {
    proxy.web(ctx.req, ctx.res, {
      target: 'http://localhost:3000'
    })
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

app.listen(process.env.NODE_PORT)
