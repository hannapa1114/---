const { book } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    const { token } = req.headers;
    const decoded_data = jwt.verify(token, "secret_key");
    book
      .findAndCountAll({
        where: {
          userId: decoded_data.userId,
        },
      })
      .then((data) => {
        if (!data) {
          return res.status(404).send("no book");
        } else {
          return res.status(200).json({ count:data.count});
        }
      });
  },
};
