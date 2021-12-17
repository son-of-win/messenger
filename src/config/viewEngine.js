let express = require('express');
let expressEjsExtend = require("express-ejs-extend");

/**
 * Config view engine for app
 */

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.engine("ejs", expressEjsExtend);
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

module.exports = configViewEngine;