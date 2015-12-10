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
    ...base_config.module,
    loaders: [
      ...base_config.module.loaders,
      { test: /\.jsx?$/, exclude:  /(node_modules)/, loaders: ['babel'] }
    ]
  },
  devtool: 'source-map',
  plugins: [...base_config.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        BABEL_ENV: JSON.stringify('dev/client')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
