'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    stackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Stacks' }
    },
    term: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    response: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  }, {});
  Card.associate = function (models) {
    // associations can be defined here
  };
  return Card;
};