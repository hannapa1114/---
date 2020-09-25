const express = require('express');
const router = express.Router();
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

router.get('/', function (req, res) {
   const api_url = 'https://openapi.naver.com/v1/search/book.json?query=' + encodeURI(req.query.query); // json 결과
   const request = require('request');
   const options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });

 });
 
module.exports = router; 

/** 정리:
 * 1. localhost:4000/search (서버) 접속시, 네이버 책 검색 api 의 data 를 가져온다.
 * 2. api 에는 module.exports = router; 없으므로 추가해야 Router.use() 에러 안난다.
 * */ 
