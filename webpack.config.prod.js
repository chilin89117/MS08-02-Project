const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const ngw = require('@ngtools/webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge.smart(commonConfig, {
  mode: 'production',
  entry: {
    'app': './assets/app/main.aot.ts'
  },
  output: {
    path: path.resolve(__dirname + '/public/js/app'),
    filename: 'bundle.js',
    publicPath: '/js/app/',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader',
        ]
      }
    ]
  },
  plugins: [
    new ngw.AngularCompilerPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: './assets/app/app.module#AppModule'
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
    ]
  }
});
