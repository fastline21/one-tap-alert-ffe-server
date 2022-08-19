const Sequelize = require('sequelize');
const db = require('../config/database');

const options = {
	tableName: 'emergency_proofs',
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
	emergency_category_id: {
		type: Sequelize.INTEGER,
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

const emergency_proofs = db.define('emergency_proofs', definition, options);

module.exports = emergency_proofs;
