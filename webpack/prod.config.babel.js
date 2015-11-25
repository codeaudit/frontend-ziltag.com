import path from 'path'
import webpack from 'webpack'

import base_config from './base.config.babel'


module.exports = {
  ...base_config,
  entry: './src/client',
  module: {
    ...base_config.module,
    loaders: [
      ...base_config.module.loaders,
      { test: /\.jsx?$/, exclude:  /(node_modules)/, loader: 'babel' }
    ]
  },
  plugins: [
    ...base_config.plugins,
    new webpack.optimize.UglifyJsPlugin()
  ]
}
