const { Router } = require('express');

const routeFactory = require('../../factories/entityRouteFactory');
const expressWrapper = require('./../../utilities/expressWrapper');

const router = new Router();

const {
  getAllEmergenciesByStatus,
  getEmergency,
} = require('../../../controllers/emergenciesController');

router.get(
  '/status/:status',
  expressWrapper(({ params }) =>
    getAllEmergenciesByStatus({ status: params.status })
  )
);

router.get(
  '/:id',
  expressWrapper(({ params }) => getEmergency({ emergencyID: params.id }))
);

const entityRoutes = routeFactory('emergencies');
router.use('/', entityRoutes);

module.exports = router;
