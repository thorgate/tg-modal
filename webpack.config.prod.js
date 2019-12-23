var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var collectExampleSource = require('./collect');

var config = {
    mode: 'production',
    entry: {
        main: './examples/main',
        'default': './examples/default'
    },
    output: {
        path: path.resolve('./dist/examples'),
        filename: 'bundle.[name].js'
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
                            hmr: false
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
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        }
                    },
                ],
            }
        ],
    }
};

module.exports = config;
