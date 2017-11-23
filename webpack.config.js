const path= require('path');
const ExtractText = require('extract-text-webpack-plugin');
const Htmlbundle = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports ={
  entry: {
    app:'./src/index.js',
    about:'./src/js/about.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist/']),
    new ExtractText('style.css'),
    new Htmlbundle({
      filename:'index.html',
      template:'src/views/index.html',
      chunks:['app']
    }),
    new Htmlbundle({
      filename:'about.html',
      template:'src/views/about.html',
      chunks:['about']
    }),
    new BrowserSyncPlugin(
  {

    host: 'localhost',
    port: 3000,

    proxy: 'http://localhost:8080/'
  },
  {
    reload: false
  }
)
  ],
  output:{
    filename: '[name].bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  devtool:'inline-source-map',
  module:{
    rules:[
      {
        test:/\.css$/,
        use:ExtractText.extract({
          fallback:'style-loader',
          use: ['css-loader','postcss-loader']
        })
      },
      {
        test:/\.scss$/,
        use:ExtractText.extract({
          fallback:'style-loader',
          use: [
            {loader: 'css-loader', options:{sourceMap: true}},
            {loader: 'postcss-loader', options:{sourceMap: true}},
            {loader: 'sass-loader', options:{sourceMap: true}}
          ]
        })
      },
      {
        test:/\.js$/,
        exclude:/(node-modules|bower_components)/,
        use:[
          'babel-loader'
        ]
      },
    ]
  }
};
