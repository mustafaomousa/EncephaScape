'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stack = sequelize.define('Stack', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Categories' }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    }
  }, {});
  Stack.associate = function (models) {
    // associations can be defined here
  };
  return Stack;
};