import path from 'path';
import Koa from 'koa';
import staticCache from 'koa-static-cache';
import polyfill from 'koa-convert';

import serve from './server';


const app = new Koa();

if (process.env.NODE_ENV == 'dev') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('koa-webpack-dev-middleware');
  const webpackHotMiddleware = require('koa-webpack-hot-middleware');
  const webpack_config = require('../webpack/dev.config.babel');
  const compiler = webpack(webpack_config);

  app.use(polyfill(webpackDevMiddleware(compiler, {
    publicPath: webpack_config.output.publicPath
  })));

  app.use(polyfill(webpackHotMiddleware(compiler)));
} else {
  require('babel-polyfill');
}

app.use(polyfill(staticCache(path.join(__dirname, 'public'), {
  prefix: '/public'
})));

serve(app);

app.listen(process.env.NODE_PORT);
