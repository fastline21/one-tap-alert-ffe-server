const serviceFactory = require('./../services/factories/serviceFactory');
const db = require('./../config/initConnection');

const getAllUsers = async () => {
	const sequelize = await db();
	const userService = new serviceFactory('users');

	return await userService.fetchAll({
		attributes: {
			exclude: [
				'password',
				'user_type_id',
				'date_added',
				'date_modified',
				'date_deleted',
			],
		},
		include: [
			{
				model: sequelize.models.user_types,
				attributes: ['name'],
			},
		],
	});
};

module.exports = {
	getAllUsers,
};
