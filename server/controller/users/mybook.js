const { book } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    const { token } = req.headers;
    const decoded_data = jwt.verify(token, "secret_key");
    // { data: email, userId: data.id }

    book.findAll({ where: { userId: decoded_data.userId } }).then((books) => {
      res.status(200).json(books);
    });
  },
};
