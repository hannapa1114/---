const { book } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  post: (req, res) => {
    const { title, comment } = req.body;
    const { token } = req.headers;
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

  take: (req, res) => {
    const { title } = req.body;
    const { token } = req.headers;
    const decoded_data = jwt.verify(token, "secret_key");

    book
      .findOne({
        where: {
          userId: decoded_data.userId,
          title: title,
        },
      })
      .then((data) => {
        res.status(200).send(data.dataValues.comment);
      })
      .catch((error) => console.log(error));
  },
  fix: (req, res) => {
    const { title, comment } = req.body;
    const { token } = req.headers;
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
      .catch((error) => console.log(error));
  },
};
