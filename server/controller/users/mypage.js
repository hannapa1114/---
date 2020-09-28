const { user } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  post: (req, res) => {
    const { token } = req.headers;
    const decoded_data = jwt.verify(token, "secret_key");
    const { password } = req.body;
    user
      .findOne({
        where: {
          email: decoded_data.data,
          password: password,
        },
      })
      .then((data) => {
        if (!data) {
          return res.status(404).send("incorrect password");
        } else {
          return res.status(200).send("success");
        }
      });
  },
};
