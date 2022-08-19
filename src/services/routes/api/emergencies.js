const { Router } = require('express');

const routeFactory = require('../../factories/entityRouteFactory');

const router = new Router();

// Entity Routes
const entityRoutes = routeFactory('emergencies');
router.use('/', entityRoutes);

module.exports = router;
