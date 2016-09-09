import path from 'path'

import webpack from 'webpack'
import postcss_cssnext from 'postcss-cssnext'


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
      { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|jpg|eot)$/, loader: 'url' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
      {
        test: /\.jsx?$/,
        exclude:  /(node_modules)/,
        loader: 'babel' ,
        query: {
          presets: [['es2015', {modules: false}], 'stage-0', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __WEBPACK__: true
    })
  ],
  resolve: {
    alias: {
      fetch: 'isomorphic-fetch'
    }
  },
  postcss: () => {
    return [postcss_cssnext]
  }
}
