/**
 * Webpack server for development.
 */

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

//noinspection JSUnresolvedVariable
var webpackPath = __dirname;

// Notify about the path where the server is running
console.log('[Webpack] Server running at location: ' + webpackPath);

// First we fire up Webpack an pass in the configuration file
var bundleStart = null;
var compiler = webpack(webpackConfig);

// We give notice in the terminal when it starts bundling and
// set the time it started
compiler.plugin('compile', function() {
    console.log('[Webpack] Bundling...');
    bundleStart = Date.now();
});

// We also give notice when it is done compiling, including the
// time it took. Nice to have
compiler.plugin('done', function() {
    console.log('[Webpack] Bundled in ' + (Date.now() - bundleStart) + 'ms!');
});

var server = new webpackDevServer(compiler, {

    // We need to tell Webpack to serve our bundled application
    // from the build path.
    publicPath: '/bundles/',

    // Configure hot replacement
    hot: true,

    // The rest is terminal configurations
    quiet: false,
    noInfo: true,
    stats: {
        colors: true
    }
});

// We fire up the development server and give notice in the terminal
// that we are starting the initial bundle
server.listen(8080, 'localhost', function () {
    console.log('[Webpack] Bundling project, please wait...');
});
