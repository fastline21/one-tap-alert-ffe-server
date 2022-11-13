const { Router } = require('express');

const routeFactory = require('../../factories/entityRouteFactory');
const expressWrapper = require('./../../utilities/expressWrapper');

const router = new Router();

const {
  getAllEmergenciesByStatus,
  getEmergency,
  getAllEmergenciesByUserIDAndStatus,
  getAllCurrentEmergencies,
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

router.get(
  '/:user_id/status/:emergency_status_id',
  expressWrapper(({ params }) =>
    getAllEmergenciesByUserIDAndStatus({
      userID: params.user_id,
      emergencyStatusID: params.emergency_status_id,
    })
  )
);

router.post(
  '/current-emergencies',
  expressWrapper(({ body }) => getAllCurrentEmergencies({ body }))
);

const entityRoutes = routeFactory('emergencies');
router.use('/', entityRoutes);

module.exports = router;
