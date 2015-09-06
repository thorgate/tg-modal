var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:8080",
        'webpack/hot/dev-server',
        './examples/main'
    ],
    devServer: {
        contentBase: './examples/',
        hot: true
    },
    devtool: "source-map",
    debug: true,
    output: {
        path: path.join(__dirname, 'examples'),
        filename: 'bundle.js',
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/un~$/)
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
                test: /\.md?$/,
                loader: 'raw'
            },
            {
                test: /\.css/,
                loader: 'style!css!autoprefixer'
            },
            {
                test: /\.scss/,
                loader: 'style!css!autoprefixer!compass'
            }
        ]
    }
};
