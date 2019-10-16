const createError = require('http-errors')
const express = require('express')
const exphbs = require('express-handlebars');
const browserify = require('browserify-middleware')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const apiRouter = require('./routes/testApi')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

// view engine setup
app
app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "layout" }))
app.set("view engine", "hbs")

.use(cors())
.get('/javascripts/bundle.js', browserify('./client/script.js'))
.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')))

.use('/', indexRouter)
.use('/users', usersRouter)
.use('/api', apiRouter)

// catch 404 and forward to error handler
.use(function(req, res, next) {
  next(createError(404))
})

// error handler
.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
