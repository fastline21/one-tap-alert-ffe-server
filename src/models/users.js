const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
  tableName: 'users',
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
  email_address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_type_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  middle_initial: {
    type: Sequelize.STRING(100),
  },
  last_name: {
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

const users = db.define('users', definition, options);

module.exports = users;
