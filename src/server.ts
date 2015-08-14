#!/usr/bin/env node
import * as express from "express";
import {errorCodes, exit} from "./server/errorCodes";
import path = require('path');
import {bundle,webPackPort} from './server/bundle';

let port = 3000;
var publicPath = path.resolve(__dirname, 'public');

var app = express();

app.use(express.static(publicPath, {}));

// You might want to run this only at dev time
if (true) {
    var httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer();    
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