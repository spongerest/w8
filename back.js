"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes");
var back = express();
var port = 3000;
back.use(bodyParser.json());
back.use('/api', routes_1.default);
back.listen(port, function () {
    console.log("Server at http://localhost:".concat(port));
});
