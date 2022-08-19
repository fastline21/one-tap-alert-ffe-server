module.exports = (sequelize) => {
	const { models } = sequelize;

	models.users.hasOne(models.user_types, {
		foreignKey: 'id',
		sourceKey: 'user_type_id',
	});
};
