const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
	tableName: 'emergency_categories',
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
		type: Sequelize.STRING(20),
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

const emergency_categories = db.define(
	'emergency_categories',
	definition,
	options
);

module.exports = emergency_categories;
