const createError = require("http-errors");
const express = require("express");
const exphbs = require("express-handlebars");
const browserify = require("browserify-middleware");
const path = require("path");
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser');
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");

const apiRouter = require("./routes/testApi");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const aboutRouter = require("./routes/about");

const { login, checkLoggedIn, logout } = require("./scripts/auth");

const app = express();

// view engine setup

app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
   // defaultLayout: "layout",
    // layoutsDir: __dirname + "/views/layouts/",
    // partialsDir: __dirname + "/views/partials/"
  })
);
app.set("view engine", "hbs");

app
  .use(cors())
  .get("/javascripts/bundle.js", browserify("./client/script.js"))
  .use(logger("dev"))
  .use(
    session({
      secret: "app",
      name: "app",
      resave: true,
      saveUninitialized: true
      // cookie: { maxAge: 6000 } /* 6000 ms? 6 seconds -> wut? :S */
    })
  )

  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")))

  .use("/user", checkLoggedIn, userRouter)
  .use("/api", checkLoggedIn, apiRouter)
  .use("/about", checkLoggedIn, aboutRouter)
  .use("/logout", logout, indexRouter)
  .use("/login", login, indexRouter)
  .use("/", checkLoggedIn, indexRouter)

  // catch 404 and forward to error handler
  .use(function(req, res, next) {
    next(createError(404));
  })

  // error handler
  .use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", {title: 'Λάθος'});
  });

module.exports = app;
