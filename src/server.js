import path from 'path'
import http from 'http'
import https from 'https'
import fs from 'fs'

import Koa from 'koa'
import staticCache from 'koa-static-cache'
import polyfill from 'koa-convert'
import httpProxy from 'http-proxy'
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
import outdent from 'outdent'

import reducer from './reducer'
import routes from './route'

import {
  NODE_ENV,
  NODE_PORT,
  SSL_PORT,
  SSL_KEY,
  SSL_CERT,
  API_ADDR,
  SSE_ADDR,
  PLUGIN_ADDR,
  FILE_ADDR,
  FORCE_SSL
} from '../env'


const SSL_OPTOINS = {
  key: fs.readFileSync(SSL_KEY),
  cert: fs.readFileSync(SSL_CERT)
}

const api_proxy = httpProxy.createProxyServer({
  target: API_ADDR,
  secure: false, // TODO: https://github.com/nodejitsu/node-http-proxy/issues/915
  ssl: SSL_OPTOINS
})

const sse_proxy = httpProxy.createProxyServer({
  target: SSE_ADDR,
  secure: false, // TODO: https://github.com/nodejitsu/node-http-proxy/issues/915
  ssl: SSL_OPTOINS
})

const plugin_proxy = httpProxy.createProxyServer({
  target: PLUGIN_ADDR,
  secure: true,
  changeOrigin: true,
  ignorePath: true
})

// TODO: https://github.com/nodejitsu/node-http-proxy/issues/839
plugin_proxy.on('proxyReq', (proxyReq, req, res, options) => {
  if (proxyReq.path != '/') {
    proxyReq.path = proxyReq.path.replace(/\/$/, '')
  }
})

const app = new Koa()

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

if (FORCE_SSL) {
  app.use(polyfill(forceSSL(SSL_PORT)))
}

app.use(polyfill(staticCache(path.join(__dirname, 'public'), {
  prefix: '/public'
})))

app.use(async (ctx, next) => {
  if (ctx.req.url == '/plugin.js') {
    plugin_proxy.web(ctx.req, ctx.res)
    ctx.respond = false
  } else if (ctx.req.url.match(/^\/api\/v1\/(ziltags|ziltag_maps)\/.*\/stream$/)) {
    sse_proxy.web(ctx.req, ctx.res)
    ctx.respond = false
  } else if (!ctx.req.url.match(/^\/(ziltags|ziltag_maps)\/.*/)) {
    api_proxy.web(ctx.req, ctx.res)
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

        const [, page_type, id] = ctx.originalUrl.split('/')

        if (page_type == 'ziltags') {
          const full_url = ctx.protocol + '://' + ctx.host + ctx.originalUrl
          const title = 'Ziltag'
          const description = 'Ziltag is a visual tagging plugin that helps you discover and discuss wonderful things.'

          var social_media_meta = outdent`
            <meta property="og:type" content="article">
            <meta property="og:title" content="${title}">
            <meta property="og:description" content="${description}">
            <meta property="og:url" content="${full_url}">
            <meta property="og:image" content="${FILE_ADDR}/uploads/ziltags/share_image/${id}/share.jpg">
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="${title}">
            <meta name="twitter:description" content="${description}">
            <meta name="twitter:image" content="${FILE_ADDR}/uploads/ziltags/share_image/${id}/share.jpg">
          `

          var responsive_meta = outdent`
            <meta name="viewport" content="width=device-width, initial-scale=1">
          `
        }

        ctx.body = (outdent`
          <!doctype html>
          <html>
            <head>
              <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
              ${social_media_meta || ''}
              ${responsive_meta || ''}
              <script src="/public/main.bundle.js"></script>
            </head>
            <body>
              ${ReactDOM.renderToString(
                <div id='react-content' dangerouslySetInnerHTML={{__html: ReactDOM.renderToString(component)}}/>
              )}
            </body>
          </html>
        `)
      })
    )
  }
})

http.createServer(app.callback()).listen(process.env.PORT || NODE_PORT)
https.createServer(SSL_OPTOINS, app.callback()).listen(
  parseInt(process.env.PORT) + 1 || SSL_PORT
)
