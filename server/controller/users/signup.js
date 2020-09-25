const { user } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email, password, username } = req.body;

    user
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          password: password,
          username: username,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send("email exists");
        }
        const data = await user.get({ plain: true });
        res.status(201).json(data);
      });
  },
};
