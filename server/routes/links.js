var express = require('express');
var router = express.Router();

// controllers/index.js 안에 usersController 를 사용
const { linksController } = require('../controller');

// * GET /links/main
router.get('/main', linksController.main.get);

// * POST /links/addbook
router.post('/addbook', linksController.addbook.post);

module.exports = router;