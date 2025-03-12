const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Table Define
const Biere = sequelize.define('Biere', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  degree: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  bars_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Bars',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'Bieres',
  timestamps: true
});

module.exports = Biere;
