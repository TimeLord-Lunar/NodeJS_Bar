const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Table Define
const Bar = sequelize.define('Bar', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Bars',
  timestamps: false,
});

module.exports = Bar;
