const { Router } = require('express');
const router = new Router();

const routeFactory = require('../../factories/entityRouteFactory');

const entityRoutes = routeFactory('incident_reports');
router.use('/', entityRoutes);

module.exports = router;
