import path from 'path'
import webpack from 'webpack'

import base_config from './base.config.babel'


module.exports = {
  ...base_config,
  entry: './src/client',
  module: {
    ...base_config.module
  },
  plugins: [
    ...base_config.plugins,
    new webpack.optimize.UglifyJsPlugin()
  ]
}
