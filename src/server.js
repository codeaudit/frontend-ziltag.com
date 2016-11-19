import path from 'path'
import http from 'http'
import https from 'https'
import fs from 'fs'

import Koa from 'koa'
import staticCache from 'koa-static-cache'
import polyfill from 'koa-convert'
import compress from 'koa-compress'
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
import redux_effects_fetch from 'redux-effects-fetch'
import outdent from 'outdent'
import fetch from 'node-fetch'

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

api_proxy.on('proxyReq', (proxyReq, req) => {
  req._proxyReq = proxyReq
})

api_proxy.on('error', (err, req) => {
  if (req.socket.destroyed && err.code == 'ECONNRESET') {
    req._proxyReq.abort()
  }
})

sse_proxy.on('proxyReq', (proxyReq, req) => {
  req._proxyReq = proxyReq
})

sse_proxy.on('error', (err, req) => {
  if (req.socket.destroyed && err.code == 'ECONNRESET') {
    req._proxyReq.abort()
  }
})

// TODO: https://github.com/nodejitsu/node-http-proxy/issues/839
plugin_proxy.on('proxyReq', (proxyReq, req) => {
  req._proxyReq = proxyReq

  if (proxyReq.path != '/') {
    proxyReq.path = proxyReq.path.replace(/\/$/, '')
  }
})

plugin_proxy.on('error', (err, req) => {
  if (req.socket.destroyed && err.code == 'ECONNRESET') {
    req._proxyReq.abort()
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

app.use(compress({
  filter: content_type => {
    return /text/i.test(content_type)
  },
  flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(async (ctx, next) => {
  ctx.compress = true
  await next()
})

if (FORCE_SSL) {
  app.use(polyfill(forceSSL(SSL_PORT)))
}

app.use(polyfill(staticCache(path.join(__dirname, 'public'), {
  prefix: '/public'
})))

app.use(async ctx => {
  if (ctx.path == '/plugin.js') {
    plugin_proxy.web(ctx.req, ctx.res)
    ctx.respond = false
  } else if (ctx.path.match(/^\/api\/v1\/(ziltags|ziltag_maps)\/.*\/stream$/)) {
    sse_proxy.web(ctx.req, ctx.res)
    ctx.respond = false
  } else if (!ctx.path.match(/^\/((ziltags|ziltag_maps)\/|reader).*/)) {
    api_proxy.web(ctx.req, ctx.res)
    ctx.respond = false
  } else {
    var store = compose(
      reduxReactRouter({routes, createHistory}),
      applyMiddleware(effects, redux_effects_fetch)
    )(createStore)(reducer)

    const [, page_type, id] = ctx.originalUrl.split('/')

    if (page_type === 'ziltags') {
      const resp = await fetch(`${API_ADDR}/api/v1/ziltags/${id}`, {
        agent: new https.Agent({
          // TODO: use ca instead
          rejectUnauthorized: false
        })
      })
      var {content: description} = await resp.json()
    }

    store.dispatch(match(ctx.request.originalUrl,
      () => {
        var component = (
          <Provider store={store} key="provider">
            <ReduxRouter/>
          </Provider>
        )

        if (page_type === 'ziltags') {
          const full_url = ctx.protocol + '://' + ctx.host + ctx.originalUrl
          const title = 'Ziltag'

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
              <title>Ziltag -- the ultimate plugin built for your website</title>
              <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
              ${social_media_meta || ''}
              ${responsive_meta || ''}
              <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500" type="text/css">
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
