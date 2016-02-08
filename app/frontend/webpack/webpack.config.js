/* global __dirname */
var webpack = require("webpack");

module.exports = exports = Object.create(require("./webpack.base.config.js"));

exports.devtool = 'source-map';
exports.debug = true;
exports.entry = ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080'].concat(exports.entry);
exports.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
];