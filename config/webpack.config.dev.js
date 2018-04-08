const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = require('./happyThreadPool');
const paths = require('./paths');
const webpackBaseConfig = require('./webpack.config.base');

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const config = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(paths.appSrc, 'app')
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.css$/,
      include: path.resolve(paths.appSrc, './styles'),
      use: 'happypack/loader?id=css'
    }, {
      test: /\.(css|scss)$/,
      exclude: path.resolve(paths.appSrc, './styles'),
      use: 'happypack/loader?id=modulecss'
    }]
  },
  devServer: {
    contentBase: paths.appDist,
    hot: true,
    compress: true,
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 当开启HMR时使用NamedModulesPlugin可以显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    new OpenBrowserPlugin({ url: `http://${hostname}:${port}` }),

    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: ['style-loader', 'css-loader'],
    }),

    new HappyPack({
      id: 'modulecss',
      threadPool: happyThreadPool,
      loaders: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]',
        'sass-loader?sourceMap=true'
      ]
    })
  ]
});

module.exports = config;
