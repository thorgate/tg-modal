var path = require('path');
var webpack = require('webpack');

var collectExampleSource = require('./collect');

function withHot(file) {
    return ['webpack-dev-server/client?http://localhost:8081', 'webpack/hot/dev-server', file];
}

module.exports = {
    entry: {
        bundle: withHot('./examples/main'),
        render: withHot('./examples/render'),
    },
    devServer: {
        contentBase: './examples/',
        port: 8081,
        hot: true
    },
    devtool: "source-map",
    debug: true,
    output: {
        path: path.join(__dirname, 'examples'),
        filename: '[name].js',
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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
