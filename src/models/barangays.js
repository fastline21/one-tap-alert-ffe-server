const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
  tableName: 'barangays',
  timestamps: true,
  paranoid: true,
  createdAt: 'date_added',
  updatedAt: 'date_modified',
  deletedAt: 'date_deleted',
};

const definition = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  tag: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  date_added: {
    type: Sequelize.DATE,
  },
  date_modified: {
    type: Sequelize.DATE,
  },
  date_deleted: {
    type: Sequelize.DATE,
  },
};

const barangays = db.define('barangays', definition, options);

module.exports = barangays;
