const { book } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { title, author, image, comment, userId } = req.body;

    book
      .create({
        title: title,
        author: author,
        image: image,
        comment: comment,
        userId: userId,
      })
      .then(() => {
        res.status(200).send("save book success!");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
