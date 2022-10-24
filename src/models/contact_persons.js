const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
  tableName: 'contact_persons',
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
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email_address: {
    type: Sequelize.STRING,
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

const contact_persons = db.define('contact_persons', definition, options);

module.exports = contact_persons;
