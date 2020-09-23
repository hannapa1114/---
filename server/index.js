var express = require('express');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

//
var usersRouter = require('./routes/users');

var app = express();

const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log("connected", port);
})

module.exports = app;

// test  dev 이하 feature/basic_server