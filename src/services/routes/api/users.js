const { Router } = require('express');

const routeFactory = require('../../factories/entityRouteFactory');
const expressWrapper = require('../../utilities/expressWrapper');

// Controllers
const { getAllUsers } = require('./../../../controllers/usersController');

const router = new Router();

// Get all users
router.get(
	'/',
	expressWrapper(() => getAllUsers())
);

// Entity Routes
const entityRoutes = routeFactory('users');
router.use('/', entityRoutes);

module.exports = router;
