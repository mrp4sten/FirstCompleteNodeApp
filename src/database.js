const express = require("express");
const path = require("path");
const exp_hbs = require("express-handlebars");

// initializations
const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(_dirname, "views"));
app.engine(".hbs", exp_hbs({
    defaultLayout: "main",
    layoutsDir:  path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
}));

app.set("view engine", ".hbs");

// middlewares

// global variables

// routes

// static files

// server is listenning
app.listen(app.get("port"));
