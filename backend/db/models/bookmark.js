"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      stackId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Stacks" },
      },
    },
    {}
  );
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User, { foreignKey: "userId" });
    Bookmark.belongsTo(models.Stack, { foreignKey: "stackId" });
  };
  return Bookmark;
};
