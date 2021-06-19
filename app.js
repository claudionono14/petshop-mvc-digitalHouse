var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/** importa globalmente o  modulo method-override */
const methodOverride = require('method-override');
/** importa globalmente o  modulo middleware */
const middlewareLog = require('./middlewares/log');
/** importa globalmente o  modulo express-session */
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*permitindo que a pasta /uploads seja acessada a partir do fron-end*/
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
/**ativa o method-override em toda a aplicacao */
app.use(methodOverride('_method'));
/** middlewares globais */
app.use(middlewareLog);
/** Tornando a session global */
app.use(session({ secret: 'petshop-express' }));


app.use('/', indexRouter);
app.use('/', usersRouter); //app.use('/users', usersRouter); foi removido o users.
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
