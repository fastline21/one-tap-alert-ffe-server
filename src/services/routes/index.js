const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const router = new Router();

const routeDir = path.join(__dirname, 'api');

const files = fs.readdirSync(routeDir);

for (const file of files) {
	const filePath = path.join(routeDir, file);

	const stats = fs.lstatSync(filePath);

	if (stats.isFile()) {
		const routeFile = require(filePath);
		const routeName = file.replace('.js', '');

		router.use(`/${routeName}`, routeFile);
	}
}

module.exports = router;
