const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Table Define
const Commande = sequelize.define('Commande', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  bars_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Bars',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('brouillon', 'en cours', 'terminée'),
    allowNull: false,
  },
}, {
  tableName: 'Commandes',
  timestamps: true,
});

module.exports = Commande;