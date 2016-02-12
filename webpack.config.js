var path = require('path');
var webpack = require('webpack');

var collectExampleSource = require('./collect');

function withHot(file) {
    return [
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/dev-server',
        file
    ];
}

module.exports = {
    entry: {
        bundle: withHot('./examples/main'),
        render: withHot('./examples/render')
    },
    devServer: {
        contentBase: './examples/',
        host: '0.0.0.0',
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
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel']
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
                test: /\.png|\.jpg|\.svg/,
                loader: 'url'
            },
            {
                test: /\.css/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.scss/,
                loader: 'style!css!postcss!sass?includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
            }
        ]
    }
};
