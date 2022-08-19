const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
	tableName: 'user_types',
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
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT,
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

const user_types = db.define('user_types', definition, options);

module.exports = user_types;
