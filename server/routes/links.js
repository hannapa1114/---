var express = require('express');
var router = express.Router();

// controllers/index.js 안에 usersController 를 사용
const { linksController } = require('../controller');

// * POST /user/signin
router.get('/main', linksController.main.get);

module.exports = router;