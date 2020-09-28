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
