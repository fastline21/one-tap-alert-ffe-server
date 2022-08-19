const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
	tableName: 'reports',
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
	start_date: {
		type: Sequelize.DATEONLY,
		allowNull: false,
	},
	end_date: {
		type: Sequelize.DATEONLY,
		allowNull: false,
	},
	file: {
		type: Sequelize.STRING(20),
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

const reports = db.define('reports', definition, options);

module.exports = reports;
