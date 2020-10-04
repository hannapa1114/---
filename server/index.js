//declare Express
const express = require('express');

//middleware
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// const session = require('express-session');
const cors = require('cors');
const cacheControl = require('express-cache-controller');
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
app.use(cacheControl({
  noCache: true
}));
/*app.use(cors({
  origin: ['http://chaegjango-client.s3-website.ap-northeast-2.amazonaws.com/'],
  method: ['GET', 'POST'],
  credentials: true
}))*/
var corsOptions = {
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.all('/*', cors(corsOptions),function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Auth-Token, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});
// app.use(session({ // 토큰개념, 세션을 관리하기 위해 필요한 미들웨어.
//   secret : 'Fantastic Four',
//   resave: true,
//   saveUninitialized: true
// }))

app.get('/', (req,res) => {
  res.status(200).send('Success!')
})
app.options('/users', cors())

// Router
app.use('/users', usersRouter);
app.use('/links', linkRouter);
app.use('/search', searchRouter);


app.listen(port, () => {
  console.log("connected", port);
})

module.exports = app;
