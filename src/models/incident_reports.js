const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
  tableName: 'incident_reports',
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
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  emergency_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  no_of_death: {
    type: Sequelize.INTEGER,
  },
  no_of_casualties: {
    type: Sequelize.INTEGER,
  },
  no_of_house_affected: {
    type: Sequelize.INTEGER,
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

const incident_reports = db.define('incident_reports', definition, options);

module.exports = incident_reports;
