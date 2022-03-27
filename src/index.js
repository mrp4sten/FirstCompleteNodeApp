const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");

// initializations
const app = express();
require("./database");

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "./views"));
app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

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
app.use(express.static(path.join(__dirname, "public")));

// server is listenning
app.listen(app.get("port"), console.log("listen on port: " + app.get("port")));
