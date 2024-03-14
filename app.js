var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors')
var mongoose = require('mongoose')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var seriesRouter = require('./routes/series')
var comicsRoouter =  require('./routes/comics')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
  );

// app.use(
//     cors()
//   );

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/series', seriesRouter)
app.use('/comics', comicsRoouter)
  
module.exports = app;
