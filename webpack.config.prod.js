var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var collectExampleSource = require('./collect');


var compassPath = path.resolve(__dirname, "./node_modules/compass-mixins/lib");

var config = {
    entry: {
        main: './examples/main',
        'default': './examples/default'
    },
    output: {
        path: './dist/examples',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.IgnorePlugin(/un~$/),
        new webpack.DefinePlugin({
            EXAMPLE_SRC: JSON.stringify(collectExampleSource())
        }),
        new ExtractTextPlugin('[name].css')
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.md/,
                loader: 'raw'
            },
            {
                test: /\.png|\.jpg|\.svg/,
                loader: 'url'
            },
            {
                test: /\.json/,
                loader: 'json'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?includePaths[]=' + compassPath, {
                    publicPath: "../"
                })
            }
        ]
    }
};

module.exports = config;
