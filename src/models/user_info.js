const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
	tableName: 'user_info',
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
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	middle_name: {
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

const user_info = db.define('user_info', definition, options);

module.exports = user_info;
