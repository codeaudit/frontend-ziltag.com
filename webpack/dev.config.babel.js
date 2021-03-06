import path from 'path'

import webpack from 'webpack'

import base_config from './base.config.babel'


module.exports = {
  ...base_config,
  entry: [
    'webpack-hot-middleware/client',
    './src/client'
  ],
  module: {
    ...base_config.module
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    ...base_config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    })
  ]
}
