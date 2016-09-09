import path from 'path'

import webpack from 'webpack'

import base_config from './base.config.babel'


module.exports = {
  ...base_config,
  entry: './src/client',
  module: {
    ...base_config.module
  },
  devtool: 'hidden-source-map',
  plugins: [
    ...base_config.plugins,
    new webpack.LoaderOptionsPlugin({
      test: /\.(js|css|png|jpg)$/,
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
