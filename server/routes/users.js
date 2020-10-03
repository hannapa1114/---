var express = require("express");
var router = express.Router();

// controllers/index.js 안에 usersController 를 사용
const { usersController } = require("../controller");

// * POST /user/signin
router.post("/signin", usersController.signin.post);

// * POST /user/signup
router.post("/signup", usersController.signup.post);

// * POST /user/mypage
router.post("/mypage", usersController.mypage.post);

// * GET /user/mybook
router.get("/mybook", usersController.mybook.get);

module.exports = router;
