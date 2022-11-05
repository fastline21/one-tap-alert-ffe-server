const { Router } = require('express');
const router = new Router();

const routeFactory = require('../../factories/entityRouteFactory');
const expressWrapper = require('../../utilities/expressWrapper');

const {
  getUser,
  registerUser,
  getAllUsersByUserTypeID,
  getAllUsersByUserStatusID,
} = require('./../../../controllers/usersController');

router.get(
  '/:id',
  expressWrapper(({ params }) => getUser({ userID: params.id }))
);

router.get(
  '/type/:user_type_id',
  expressWrapper(({ params }) =>
    getAllUsersByUserTypeID({ userTypeID: params.user_type_id })
  )
);

router.get(
  '/status/:user_status_id',
  expressWrapper(({ params }) =>
    getAllUsersByUserStatusID({ userStatusID: params.user_status_id })
  )
);

router.post(
  '/register',
  expressWrapper(({ body, files }) => registerUser({ body, files }))
);

const entityRoutes = routeFactory('users');
router.use('/', entityRoutes);

module.exports = router;
