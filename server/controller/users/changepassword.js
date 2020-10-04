const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = {
  post: (req, res) => {
    const { token } = req.headers;
	  console.log(token)
    const decoded_data = jwt.verify(token, "secret_key");
    let { password } = req.body;
   
    const shasum = crypto.createHmac("sha512", "thisismysecretkey");
    shasum.update(password);
    password = shasum.digest("hex");

    user.findOne({where: {email: decoded_data.data} })
	  .then(data => {
		  if(data.dataValues.password !== password) {
    user
      .update(
        { password: password },
        {
          where: {
            email: decoded_data.data,
          },
        }
      )
      .then(() => {
        res.status(200).send("changed successfully");
      })
      .catch((err) => {
        throw err;
      });
		  } else {
			  res.status(409).send("input same password!")
		  }
	  })
		  },
};
