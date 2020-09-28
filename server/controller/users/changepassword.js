const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = {
  post: (req, res) => {
    const { token } = req.headers;
    const decoded_data = jwt.verify(token, "secret_key");
    let { password } = req.body;

    const shasum = crypto.createHmac("sha512", "thisismysecretkey");
    shasum.update(password);
    password = shasum.digest("hex");

    user
      .update(
        { password: password },
        {
          where: {
            email: decoded_data.data,
          },
        }
      )
      .then(() => {
        res.status(200).send("changed successfully");
      })
      .catch((err) => {
        throw err;
      });
  },
};
