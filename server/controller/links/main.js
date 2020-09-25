const { user } = require("../../models");
const jwt = require('jsonwebtoken');

module.exports = {
  get: (req, res) => {
  const { token } = req.headers;
  const decoded_data = jwt.verify(token, 'secret_key');
  // console.log('decoded_data: ', decoded_data.data);
  user.findOne({
    where: {
      email: decoded_data.data
    }  
  })
  .then(data => {
    console.log('data: ', data);
    res.status(200).json({data: data.username});
  })
  .catch((err) => {
    res.status(404).send(err);
  });
  }

}