/* eslint @typescript-eslint/no-var-requires: "off" */
import express = require("express");
import path = require("path");

const PORT = process.env.PORT || 8500;

const app = express();

// NOW WE set to a directory from which we will server static files. in this case, it is build folder
app.use(express.static(path.join(__dirname, "build"), { index: false }));
// app.use(express.static(path.join(__dirname, "public"), { index: false }));

// send user to index.html despite the url
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.listen(PORT);
