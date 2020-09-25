//declare Express
const express = require("express");

//middleware
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const { user } = require("../../models");

//Routes
const usersRouter = require("./routes/users");

const app = express();
const port = 4000;
const clientID =
  "361000745466-5e1gmatmqs26vpjlkk9ku4ggeh1n6s7s.apps.googleusercontent.com"; //구글 인증을 위한 클라이언트 아이디와 시크릿
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

//use middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use(
  session({
    // 세션을 관리하기 위해 필요한 미들웨어.
    secret: "Fantastic Four",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passport.serializeUser((user, done) => {
  done(null, user); // user객체가 deserializeUser로 전달됨.
});
passport.deserializeUser((user, done) => {
  done(null, user); // 여기의 user가 req.user가 됨
});
passport.use(
  new googleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3000/login/google/callback", // 배포 서버 도메인으로 변경 예정
    },
    function (accessToken, refreshToken, profile, callback) {
      const {
        _json: { id, login: name, email }
      } = profile
      try {
        const user = await user.findOne({ email: email })
        //동일한 이메일을 가졌을 때는 이미 가입중인 사용자라면 바로 로그인하도록 아니라면 신규 사용자 생성
        if (user) {
          user.googleId = id
          user.save()
          return cb(null, user)
        } else {
          const newUser = await user.create({
            email,
            name,
            googleId: id,
          })
          return cb(null, newUser)
        }
      } catch (error) {
        return cb(error)
      }
    }
    
  )
);

app.get("/", (req, res) => {
  res.status(200).send("Success!");
});

// Router
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log("connected", port);
});

module.exports = app;
