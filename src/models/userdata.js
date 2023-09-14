'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userData.init({
    name: {allowNull: false,type:DataTypes.STRING},
    emailId:{allowNull: false,type:DataTypes.STRING,unique:true,validate:{isEmail:true}},
    password: {allowNull: false,type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'userData',
  });
  userData.beforeCreate(function hashPassword(userData) {
    const encryptedPassword = bcrypt.hashSync(userData.password, 5);
    userData.password = encryptedPassword;
  });
  return userData;
};