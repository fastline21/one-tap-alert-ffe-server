const { Router } = require('express');
const router = new Router();

const routeFactory = require('../../factories/entityRouteFactory');

const entityRoutes = routeFactory('barangays');
router.use('/', entityRoutes);

module.exports = router;
