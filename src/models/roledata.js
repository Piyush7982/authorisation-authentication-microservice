'use strict';
const roles= require("../util/common/enums")
const{MASTER_ADMIN,THEATRE_ADMIN,USER}= roles
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roleData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roleData.init({
    role: {type:DataTypes.ENUM([USER,MASTER_ADMIN,THEATRE_ADMIN]),
      allowNull:false,
      defaultValue:USER
  }
  }, {
    sequelize,
    modelName: 'roleData',
  });
  return roleData;
};