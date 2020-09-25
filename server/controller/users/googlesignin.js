const { user } = require("../../models");

module.exports = {
  googleLogin: (req, res) => {
    passport.authenticate("google", { scope: ["profile"] });
  },
  googleLoginCallback: (req, res) => {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/login",
      },
      function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/main");
      }
    );
  },
};
