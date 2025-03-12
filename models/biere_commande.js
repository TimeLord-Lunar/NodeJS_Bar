const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Bar = require('./bars');  // Import du modèle Bar
const Commande = require('./commande');  // Import du modèle Commande

// Table Define
const BiereCommande = sequelize.define('BiereCommande', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bar_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Bars',
      key: 'id',
    },
    onDelete: 'CASCADE',  // For suppression of Bar
  },
  commande_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Commandes',
      key: 'id',
    },
    onDelete: 'CASCADE',  // For suppression of Commande
  },
  biere_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'BiereCommandes',
  timestamps: true,
});

module.exports = BiereCommande;
