const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')

const config = {
  entry: {
    app: path.join(paths.appSrc, 'app')
  },
  output: {
    path: paths.appDist,
    filename: 'assets/js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.appSrc, 'index.html')
    })
  ]
}

module.exports = config