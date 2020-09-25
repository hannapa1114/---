//declare Express
const express = require('express');

//middleware
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// const session = require('express-session');
const cors = require('cors');
// const jwt = require('jsonwebtoken');

//Routes
const usersRouter = require('./routes/users');
const linkRouter = require('./routes/links');
const searchRouter = require('./routes/search');

const app = express();
const port = 4000;

//use middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  method: ['GET', 'POST'],
  credentials: true
}))

// app.use(session({ // 토큰개념, 세션을 관리하기 위해 필요한 미들웨어.
//   secret : 'Fantastic Four',
//   resave: true,
//   saveUninitialized: true
// }))

app.get('/', (req,res) => {
  res.status(200).send('Success!')
})

// Router
app.use('/users', usersRouter);
app.use('/links', linkRouter);
app.use('/search', searchRouter);


app.listen(port, () => {
  console.log("connected", port);
})

module.exports = app;
