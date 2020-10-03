"use strict";
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (data, option) => {
          var shasum = crypto.createHmac("sha512", "thisismysecretkey");
          shasum.update(data.password);
          data.password = shasum.digest("hex");
        },
        beforeFind: (data, option) => {
          if (data.where.password) {
            var shasum = crypto.createHmac("sha512", "thisismysecretkey");
            shasum.update(data.where.password);
            data.where.password = shasum.digest("hex");
          }
        },
      },
    }
  );
  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.book, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  };

  return user;
};
