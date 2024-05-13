const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../util/db')

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'User',
  },
);

module.exports = User