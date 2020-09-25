const { user } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    const sess = req.session;

    user
      .findOne({
        where: {
          email: email,
          password: password,
        },
      })
      .then((data) => {
        if (!data) {
          return res.status(404).send("unvalid user");
        }
        sess.userid = data.id;
        res.status(200).json({
          id: data.id,
        });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
