const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
	tableName: 'request_backups',
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
	description: {
		type: Sequelize.TEXT,
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

const request_backups = db.define('request_backups', definition, options);

module.exports = request_backups;
