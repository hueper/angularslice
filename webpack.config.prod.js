var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var webpackConfig = require('./webpack.config.js');

var prodConfig = {
  cache: false,
  debug: false,
  devtool: false,
  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/index.html', to: 'index.html'},
    ]),
    //new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      minimize: true,
      sourceMap: false,
      mangle: {
        screw_ie8: true
      },// prod
      compress: {
        screw_ie8: true,
        warnings: false
      },//prod
      comments: false//prod
    })
  ]
};

// webpackConfig.devtool;

module.exports = webpackMerge({}, webpackConfig, prodConfig);
//module.exports = webpackConfig;