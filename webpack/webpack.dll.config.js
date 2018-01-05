const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')
const root = path.resolve(__dirname, '..')

module.exports = {
    entry: {
        vendors: [
            'react',
            'react-router',
            'moment'
        ]
    },

    output: {
        filename: '[name].dll.js',
        path: root + "/exampledist/static",
        library
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(root, 'exampledist/static/[name]-manifest.json'),
            // This must match the output.library option above
            name: library
        }),
    ],
}