var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');

var ENV = process.env.ENV ? process.env.ENV : 'development';

console.log('Environment: ', ENV);

var metadata = {
  title: 'Budacode',
  baseUrl: '/',
  host: '0.0.0.0',
  port: 3001,
  ENV: ENV
};

// Webpack Config
var webpackConfig = {
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  },
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts',
  },

  output: {
    path: './dist',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills'], minChunks: Infinity}),
    // new OpenBrowserPlugin({ url: 'http://' + metadata.host + ':' + metadata.port }),
    // new DefinePlugin(metadata),
    new webpack.DefinePlugin({
      '__DEV__': metadata.ENV !== 'production' ? true : false
    })
  ],

  module: {
    loaders: [
      {test: /\.jade$/, loader: 'jade-loader'},
      {test: /\.ts$/, loader: 'awesome-typescript-loader'},
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\/shared\/.*.scss$/, loaders: ['style', 'css', 'autoprefixer', 'resolve-url', 'sass']},
      {test: /\.component.scss$/, loaders: ['raw', 'extract', 'css', 'autoprefixer', 'resolve-url', 'sass']},
      {test: [/ionicons\.svg/, /ionicons\.eot/, /\.ttf/, /\.woff/], loader: 'file-loader?name=fonts/[name].[ext]'},
      {test: /\.(png|jpg|jpeg|svg|gif)$/, loader: 'file-loader?name=img/[name].[ext]'},
      {test: /\.otf$/, loader: 'file-loader?name=fonts/[name].[ext]'}
    ]
  }

};

// Our Webpack Defaults
var defaultConfig = {
  devtool: 'source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
        ]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },

  resolve: {
    root: [path.join(__dirname, 'src')],
    extensions: ['', '.ts', '.js']
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  },

  // node: {
  //   global: 1,
  //   crypto: 'empty',
  //   module: 0,
  //   Buffer: 0,
  //   clearImmediate: 0,
  //   setImmediate: 0
  // },
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(webpackConfig, defaultConfig);
