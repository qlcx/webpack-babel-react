const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = require('./happyThreadPool');
const paths = require('./paths');
const webpackBaseConfig = require('./webpack.config.base');

const config = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  module: {
    rules: [{
      test: /\.css$/,
      include: path.resolve(paths.appSrc, './styles'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'happypack/loader?id=css'
      })
    }, {
      test: /\.(css|scss)$/,
      exclude: path.resolve(paths.appSrc, './styles'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'happypack/loader?id=modulecss'
      })
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new UglifyjsWebpackPlugin({
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false,
        },
        mangle: {
          keep_fnames: true
        },
        compress: {
          warnings: false,
          drop_console: true
        },
      }
    }),
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          name: 'vendor',
          filename: '[name].[chunkhash].js',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
      }
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: 'manifest',
    }),
    new ExtractTextPlugin('styles.css'),

    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: ['css-loader'],
    }),

    new HappyPack({
      id: 'modulecss',
      threadPool: happyThreadPool,
      loaders: [
        'css-loader?modules&localIdentName=[name]__[local]',
        'sass-loader?sourceMap=true'
      ]
    })
  ]
});

module.exports = config;
