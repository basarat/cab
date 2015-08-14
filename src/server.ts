#!/usr/bin/env node
import * as express from "express";
import {errorCodes, exit} from "./server/errorCodes";
import path = require('path');
import fs = require("fs");

let port = 3000;
var publicPath = path.resolve(__dirname, 'public');

var app = express();

app.use(express.static(publicPath, {}));

import {bundle, webpackPort} from './server/bundle';
// We determine devtime by checking if there is actually a bundled front-end source code
if (!fs.existsSync(__dirname + '/public/build/bundle.js')) {
    var httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer();
    bundle();
    app.all('/build/*', function(req, res) {
        proxy.web(req, res, {
            target: `http://localhost:${webpackPort}`
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