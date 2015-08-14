/**
 * Dev time server for front-end
 */
import path = require('path');
import fs = require('fs');
import express = require('express');
import {cookies} from "./cookies";

var config = require('../webpack.config.js');

export var webpackPort = 8888;

function bundle() {
    var Webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');

    /**
     * Update the prod config for dev time ease
     */
    var prodConfig = Object.create(config);
    // Makes sure errors in console map to the correct file and line number
    prodConfig.devtool = 'eval';
    prodConfig.entry = [        
    // For hot style updates
        'webpack/hot/dev-server',
        // The script refreshing the browser on hot updates
        `webpack-dev-server/client?http://localhost:${webpackPort}`,
        // Also keep existing
    ].concat(config.entry);
    
    // We have to manually add the Hot Replacement plugin when running
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

export function setup(app: express.Express) {

    var _proxy;
    var devTime = false;
    function startProxyAndBundleIfNeeded() {
        if (_proxy) return;

        var httpProxy = require('http-proxy');
        _proxy = httpProxy.createProxyServer();
        bundle();
    }

    // Proxy handling
    app.all('/build/*', function(req, res, next) {
        if (devTime) {
            startProxyAndBundleIfNeeded();
            _proxy.web(req, res, {
                target: `http://localhost:${webpackPort}`
            });
        }
        else {
            next();
        }
    });

    // Dev time detection
    app.use('/', function(req, res, next) {
        if (req.cookies.dev == 'true') {            
            devTime = true;
            res.setHeader('Cache-Control','no-cache, no-store, must-revalidate');
            res.setHeader('Pragma','no-cache');
            res.setHeader('Expires','0');
        }
        else {
            devTime = false;
        }
        next();
    });

    app.use('/dev', (req, res, next) => {        
        devTime = true;
        res.cookie(cookies.dev, true);
        res.send('Hot Reload setup!')
    });

    app.use('/prod', (req, res, next) => {
        devTime = false;
        res.cookie(cookies.dev, false);
        res.send('Using static bundled files')
    });
}