const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
	tableName: 'emergencies',
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
	emergency_type_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	longitude: {
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	latitude: {
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	cause: {
		type: Sequelize.TEXT,
	},
	emergency_status_id: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
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

const emergencies = db.define('emergencies', definition, options);

module.exports = emergencies;
