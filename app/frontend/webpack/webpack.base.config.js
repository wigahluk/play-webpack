/* global __dirname */
var webpack = require('webpack');
var path = require('path');
console.log(__dirname);
var buildPath = path.resolve(__dirname, '../../../public/bundles/');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var config = {
    entry: [
        './app/main.ts'
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        sourceMapFilename: "bundle.map",
        publicPath: '/bundles/'
    },
    externals: {
    },
    module: {
        preLoaders: [],
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loade!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.svg$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    resolve: {
        extensions: prepend(['.ts','.js','.json','.css','.html'], '.async')
    },
    plugins: [
        //new webpack.ProvidePlugin({
        //    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        //})
    ]
};

module.exports = config;


function prepend(extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) { args = [args] }
    return extensions.reduce(function(memo, val) {
        return memo.concat(val, args.map(function(prefix) {
            return prefix + val
        }));
    }, ['']);
}
