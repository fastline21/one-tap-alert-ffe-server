const { Router } = require('express');

const expressWrapper = require('./../../utilities/expressWrapper');
const routeFactory = require('../../factories/entityRouteFactory');

const {
  submitEmergencyProof,
} = require('../../../controllers/emergencyProofsController');

const router = new Router();

router.post(
  '/',
  expressWrapper(({ body, files }) =>
    submitEmergencyProof({
      body,
      files,
    })
  )
);
const entityRoutes = routeFactory('emergency_proofs');
router.use('/', entityRoutes);

module.exports = router;
