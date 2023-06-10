'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'role_id'
      });
      User.hasMany(models.Appointment, {
        foreignKey: 'user_id_1',
        as: 'patient'
      });
      User.hasMany(models.Appointment, {
        foreignKey: 'user_id_2',
        as: 'doctor'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    collegiate_number: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};