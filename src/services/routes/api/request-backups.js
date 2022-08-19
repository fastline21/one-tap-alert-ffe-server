const { Router } = require('express');

const routeFactory = require('../../factories/entityRouteFactory');

const router = new Router();

// Entity Routes
const entityRoutes = routeFactory('request_backups');
router.use('/', entityRoutes);

module.exports = router;
