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
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
  },
);

module.exports = User