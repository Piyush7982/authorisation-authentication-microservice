'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.role, {through: 'user_role'});
    }
  }
  user.init({
    name: {allowNull: false,type:DataTypes.STRING},
    emailId:{allowNull: false,type:DataTypes.STRING,unique:true,validate:{isEmail:true}},
    password: {allowNull: false,type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'user',
  });
  user.beforeCreate(function hashPassword(user) {
    const encryptedPassword = bcrypt.hashSync(user.password, 5);
    user.password = encryptedPassword;
  });
  return user;
};