const webpack = require('webpack');
const path = require('path')
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

const root = path.resolve(__dirname, '..')
module.exports = {
    entry: root + "/example/bundle.js",
    output: {
        path: root + "/test",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.es6'],
        modules: ['node_modules']
    },
    module: {
        loaders: [
            { test: /\.jsx$|\.es6$|\.js$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
            { test: /\.scss$|\.css$/, loader: 'style-loader!style-loader!css-loader!sass-loader' },
            { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
            { test: /\.json/, loader: 'json-loader' }
        ]
    },
    plugins: [
        //new HtmlWebpackPlugin({
        //    template: root + "/example/index.html"
        //}),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        //new ExtractTextPlugin("bundle.css")
    ]
};
