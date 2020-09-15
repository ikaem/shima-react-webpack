"use strict";
exports.__esModule = true;
/* eslint @typescript-eslint/no-var-requires: "off" */
var express = require("express");
var path_1 = require("path");
var PORT = process.env.PORT || 8500;
var app = express();
// NOW WE set to use current directory from where the script is running
// app.use(express.static(__dirname));
app.use(express.static(path_1.join(__dirname, "build"), { index: false }));

// send user to index.html despite the url
app.get("*", function (req, res) {
  res.sendFile(path_1.resolve(__dirname, "build/index.html"));
});
app.listen(PORT, function () {
  console.log("listening on port", PORT);
});
