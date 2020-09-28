const { user } = require("../../models");

const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;

    user
      .findOne({
        where: {
          email: email,
          password: password,
        },
      })
      .then((data) => {
        if (!data) {
          return res.status(404).send("unvalid user");
        } else {
          let token = jwt.sign({data: email}, "secret_key");
          res.status(200).json({token: token});
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};


// TODO: server 에서는 복호화 과정 써주면 된다

// main page 요청 처리 router 만들기.
// login 에서 오는 처리를 해줘야 한다.
// login 요청, 인증시 토큰 보내주고, c 받은 토큰을 메인페이지에 요청한다.

// 토큰 인증을 확인하는 함수를 만든다.
// c 에서 받은 토큰이 유효한 토큰인지 확인하는 함수를 만든다

