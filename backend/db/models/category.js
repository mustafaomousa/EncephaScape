'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, { timestamps: false });
  Category.associate = function (models) {
    Category.hasMany(models.Stack, { foreignKey: 'categoryId' });
  };
  return Category;
};