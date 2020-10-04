const { book } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  post: (req, res) => {
    const { title, comment } = req.body;
    const decoded_data = jwt.verify(token, "secret_key");

    book
      .update(
        { comment: comment },
        {
          where: {
            userId: decoded_data.userId,
            title: title,
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
