/**
 * Dev time server for front-end
 */
var path = require('path');
var fs = require('fs');
var prodConfig = require('../webpack.config.js');

export var webpackPort = 8888;

export function bundle() {
    var Webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');

    /**
     * Update the prod config for dev time ease
     */
    // Makes sure errors in console map to the correct file
    // and line number
    prodConfig.devtool = 'eval';
    prodConfig.entry = [        
        // For hot style updates
        'webpack/hot/dev-server',
        // The script refreshing the browser on none hot updates
        `webpack-dev-server/client?http://localhost:${webpackPort}`,
        // Also keep existing
    ].concat(prodConfig.entry);
    
    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    prodConfig.output.publicPath = '/build/';
    
    // We have to manually add the Hot Replacement plugin when running
    // from Node
    prodConfig.plugins = [new Webpack.HotModuleReplacementPlugin()];
    
    /** End changes of prod config */

    // First we fire up Webpack an pass in the configuration we
    // created
    let bundleStart: number;
    let compiler = Webpack(prodConfig);

    // We give notice in the terminal when it starts bundling and
    // set the time it started
    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', function(result) {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    var bundler = new WebpackDevServer(compiler, {

        // We need to tell Webpack to serve our bundled application
        // from the build path. When proxying
        publicPath: '/build/',

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
    bundler.listen(webpackPort, 'localhost', function() {
        console.log('Bundling project, please wait...');
    });
};