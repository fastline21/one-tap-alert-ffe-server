const initDatabase = require('./initDatabase');
const db = require('./database');

let cache = {};

module.exports = async () => {
	if (!cache['one-tap-alert-ffe']) {
		await initDatabase(db);
		cache['one-tap-alert-ffe'] = db;
	}

	return cache['one-tap-alert-ffe'];
};
