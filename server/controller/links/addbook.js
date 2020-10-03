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
          return res.status(200).send("success!");
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
