/* global __dirname */
var webpack = require('webpack');
var path = require('path');
console.log(__dirname);
var buildPath = path.resolve(__dirname, '../../../public/bundles/');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

/**
 * Base configuration object for Webpack
 */
var config = {
    entry: [
        './app/main.ts'
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map',
        publicPath: '/bundles/'
    },
    externals: {
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: 'url-loader?limit=100000'
            },
            {
                test: /\.svg$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    resolve: {
        extensions: ['.ts','.js','.json','.css','.html']
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './app')
        ),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};

module.exports = config;


