const { Router } = require('express');

const routeFactory = require('../../factories/entityRouteFactory');

const router = new Router();

// Entity Routes
const entityRoutes = routeFactory('emergency_proofs');
router.use('/', entityRoutes);

module.exports = router;
