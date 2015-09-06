var path = require('path');
var webpack = require('webpack');
var fs = require('fs');


function collectExampleSource() {
    var baseDir = path.join(__dirname, 'examples', 'components', 'examples');
    var files = fs.readdirSync(baseDir);
    var result = {};

    files.forEach(function (fileName) {
        if (/\.jsx?$/.test(fileName)) {
            result[fileName.replace(/\.jsx?$/, '')] = fs.readFileSync(path.join(baseDir, fileName), {encoding: 'utf-8'});
        }
    });

    return result;
}


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
