const fs = require('fs');
const path = require('path');

module.exports = async (sequelize) => {
	const root = path.resolve('./src');
	const modelsDir = path.join(root, 'models');

	fs.readdirSync(modelsDir).forEach((file) => {
		require(path.join(modelsDir, file));
	});

	require(path.join(root, 'config', 'relationships.js'))(sequelize);
};
