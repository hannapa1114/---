var express = require("express");
var router = express.Router();

// controllers/index.js 안에 usersController 를 사용
const { usersController } = require("../controller");

// * POST /user/signin
router.post("/signin", usersController.signin.post);

router.get("/signin/google", usersController.googleSignin.googleLogin);

router.get(
  "/signin/google/callback",
  usersController.googleSignin.googleLoginCallback
);

module.exports = router;
