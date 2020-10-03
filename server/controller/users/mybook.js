const { book } = require("../../models");

module.exports = {
  get: (req, res) => {
    book.findAll().then((books) => {
      res.status(200).json(books);
    });
  },
};
