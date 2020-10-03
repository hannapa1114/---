"use strict";

module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define("book", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    comment: DataTypes.STRING,
    isbn: DataTypes.INTEGER,
  });

  book.associate = function (models) {
    book.belongsTo(models.user, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: true,
      },
    });
  };

  return book;
};
