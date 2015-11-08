import path from 'path';
import webpack from 'webpack';

import base_config from './base.config.babel';


module.exports = {
  ...base_config,
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    './src/client'
  ],
  module: {
    ...base_config.module,
    loaders: [
      ...base_config.module.loaders,
      { test: /\.jsx?$/, exclude:  /(node_modules)/, loaders: ['react-hot', 'babel'] }
    ]
  },
  devtool: 'source-map',
  plugins: [...base_config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
