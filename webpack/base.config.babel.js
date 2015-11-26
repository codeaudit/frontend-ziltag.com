import path from 'path'

import webpack from 'webpack'
import cssnano from 'cssnano'
import postcss_nesting from 'postcss-nesting'

import {NODE_ENV} from '../env'


module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist/public'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style', 'css', 'postcss', 'cssnext'] },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|jpg|eot)$/, loader: 'url' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'isomorphic-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${NODE_ENV}'`
      },
      __WEBPACK__: true
    })
  ],
  postcss: () => {
    return [postcss_nesting, cssnano]
  }
}
