'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  boards.init({
    creator_id: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    passwd: DataTypes.STRING,
    hit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'boards',
  });
  return boards;
};