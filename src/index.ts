#!/usr/bin/env node
import * as express from "express";
import {errorCodes, exit} from "./errorCodes";

let port = 3000;
var app = express();

app.use(express.static('public'));

var server = app.listen(port, function(e) {
    if (e) {
        console.error(e);
        exit(errorCodes.couldNotListen);
    }
    console.log(`Dashboard at http://localhost:${port}`);
});