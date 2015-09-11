var path = require('path');
var webpack = require('webpack');

var collectExampleSource = require('./collect');


var config = {
    entry: './examples/main',
    output: {
        path: './dist/examples',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.IgnorePlugin(/un~$/),
        new webpack.DefinePlugin({
            EXAMPLE_SRC: JSON.stringify(collectExampleSource())
        })
    ],
    resolve: {
        extensions: ['', '.js'],
        alias: {
            bootstrap: path.join(__dirname, 'node_modules', 'bootstrap-sass', 'assets', 'stylesheets', 'bootstrap')
        }
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
                test: /\.json/,
                loader: 'json'
            },
            {
                test: /\.css/,
                loader: 'style!css!autoprefixer'
            },
            {
                test: /\.scss/,
                loader: 'style!css!autoprefixer!sass?'+
                        'includePaths[]=' + encodeURIComponent(path.resolve(__dirname, 'node_modules', 'bootstrap-sass', 'assets', 'stylesheets'))
            }
        ]
    }
};

module.exports = config;
