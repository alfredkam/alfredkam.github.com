require('babel-core/register')({
  ignore: /(node_modules|__tests__)/,
  optional : [
    'es7.asyncFunctions',
    'es7.classProperties',
    'es7.comprehensions',
    'es7.decorators',
    'es7.doExpressions',
    'es7.exponentiationOperator',
    'es7.exportExtensions',
    'es7.objectRestSpread',
    'es7.trailingFunctionCommas'
  ],

  blacklist: ['strict'],

  extensions: [".es6", ".es", ".jsx", ".es6.js", ".js" ]
});

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  context: __dirname,

  entry: {
      app: './src/App.js',
      vendor: ['prismjs', 'zepto']
  },

  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'static/scripts'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('styles.css')
  ],

  resolve: {
    alias: {
      "zepto": "zepto/zepto.min.js",  // var $ = require('zepto')
    }
  },

  module: {
    preLoaders: [
        {
          test: /\.js$/,
          loader: "source-map-loader"
        }
    ],
    loaders: [
      { test: /zepto(\.min)?\.js$/, loader: "exports?Zepto; delete window.$; delete window.Zepto;" },
      {
        test: /\.jsx$/,
        loaders: ['jsx-loader?harmony']
      },
      {
          test: /\.(es6|js)$/,
          loader: 'babel-loader?stage=0&blacklist=useStrict'
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'autoprefixer-loader')},
      { test: /\.less$/, loader: ExtractTextPlugin.extract( 'css?sourceMap!less?sourceMap!autoprefixer-loader')},
      { test: /\.json$/, loaders: [ 'json-loader' ] },
      {
          test: /\.(woff|ttf|eot|svg)$/, loader: 'file-loader'
      }
    ]
  }
};
