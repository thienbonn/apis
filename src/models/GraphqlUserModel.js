// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBGraphQl');

const User = sequelize.define('User', {
  use_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true
  }
},
{
    tableName: 'UserAccount',
    timestamps: false,
}
);

module.exports = User;
