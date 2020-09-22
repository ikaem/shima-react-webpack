"use strict";
exports.__esModule = true;
/* eslint @typescript-eslint/no-var-requires: "off" */
var express_1 = require("express");
var path = require("path");
var PORT = process.env.PORT || 8500;
var app = express_1["default"]();
// NOW WE set to a directory from which we will server static files. in this case, it is build folder
app.use(express_1["default"].static(path.join(__dirname, "build"), { index: false }));
app.use(express_1["default"].static(path.join(__dirname, "public"), { index: false }));
// send user to index.html despite the url
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./public/index.html"));
});
app.listen(PORT);
