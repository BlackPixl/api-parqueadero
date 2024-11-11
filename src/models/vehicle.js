const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @const {Model}
 */
const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('car', 'motorcycle'),
    allowNull: false
  },
  entryTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  exitTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isParked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Vehicle;
