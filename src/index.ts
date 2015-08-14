#!/usr/bin/env node
import * as express from "express";
import {errorCodes, exit} from "./errorCodes";

let port = 3000;
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

var server = app.listen(port, function(e) {
    if (e) {
        console.error(e);
        exit(errorCodes.couldNotListen);
    }
    console.log(`Example app listening at http://localhost:${port}`);
});