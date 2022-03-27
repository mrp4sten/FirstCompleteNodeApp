const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");

// initializations
const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.set("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.set("view engine", ".hbs");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({ secret: "mysecretapp", resave: true, saveUninitialized: true })
);

// global variables

// routes
app.use(require("./routes/index"));
app.use(require("./routes/patients"));
app.use(require("./routes/stock"));
app.use(require("./routes/tasks"));
app.use(require("./routes/users"));

// static files

// server is listenning
app.listen(app.get("port"));
