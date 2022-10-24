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
  zip_code: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  barangay_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  contact_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_status_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  captured_image_front_id: {
    type: Sequelize.STRING,
  },
  captured_image_back_id: {
    type: Sequelize.STRING,
  },
  captured_image_selfie: {
    type: Sequelize.STRING,
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
