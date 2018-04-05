var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode:'development',
  entry: {
    'basic': [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
      './example/bundle.js'
    ]
  },
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: 'http://localhost:8080/',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.es6'],
    modules: ['node_modules']
  },
  module: {
  rules: [
    { test: /\.jsx$|\.es6$|\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    { test: /\.scss$|\.css$/, loader: 'style-loader!style-loader!css-loader!sass-loader' },
    { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
    { test: /\.json/, loader: 'json-loader' }
  ]},
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: "cheap-source-map"
};
