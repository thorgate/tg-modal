var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var collectExampleSource = require('./collect');

module.exports = {
    mode: 'development',
    entry: {
        bundle: './examples/main',
        render: './examples/render'
    },
    devServer: {
        contentBase: './examples/',
        host: '0.0.0.0',
        // Enable when using ngrok
        // disableHostCheck: true,
        port: 8081,
        hot: true
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, 'examples'),
        filename: '[name].main.js',
    },
    plugins: [
        new webpack.IgnorePlugin(/un~$/),
        new webpack.DefinePlugin({
            EXAMPLE_SRC: JSON.stringify(collectExampleSource())
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel-loader']
            },
            {
                test: /\.md/,
                loader: 'raw-loader'
            },
            {
                test: /\.png|\.jpg|\.svg/,
                loader: 'url-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                mode: 'global'
                            },
                            importLoaders: 2
                        },
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: function() {
                                return [autoprefixer]
                            },
                        },
                    }, {
                        loader: "resolve-url-loader",
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            outputStyle: 'expanded',
                        }
                    },
                ],
            }
        ]
    }
};
