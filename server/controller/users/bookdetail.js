const { book } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { userId, title, comment } = req.body;
    book
      .update(
        { comment: comment },
        {
          where: {
            userId: userId,
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
