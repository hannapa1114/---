const { book } = require("../../models");
const jwt = require("jsonwebtoken")

module.exports = {
  post: (req, res) => {
    const { token } = req.headers;
    const { title, author, image, comment } = req.body;
    const decoded_data = jwt.verify(token, "secret_key");

    book
      .create({
        title: title,
        author: author,
        image: image,
        comment: comment,
        userId: decoded_data.userId,
      })
      .then(() => {
        res.status(200).send("save book success!");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
