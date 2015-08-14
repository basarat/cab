#!/usr/bin/env node
import * as express from "express";
import {errorCodes, exit} from "./server/errorCodes";
import path = require('path');

let port = 3000;
var publicPath = path.resolve(__dirname, 'public');

var app = express();

app.use(express.static(publicPath, {}));

// We only want to run the workflow when not in production
if (true) {
    var httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer();
    var bundle = require('./server/bundle.js');
    bundle();
    app.all('/build/*', function(req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });
}

var server = app.listen(port, function(e) {
    if (e) {
        console.error(e);
        exit(errorCodes.couldNotListen);
    }
    console.log(`Dashboard at http://localhost:${port}`);
});