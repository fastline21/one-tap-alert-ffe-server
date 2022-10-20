const { Router } = require('express');
const router = new Router();

const routeFactory = require('../../factories/entityRouteFactory');
const expressWrapper = require('../../utilities/expressWrapper');

const {
  getAllUsers,
  registerUser,
} = require('./../../../controllers/usersController');

// router.get(
//   '/',
//   expressWrapper(() => getAllUsers())
// );

router.post(
  '/register',
  expressWrapper(({ body, files }) => registerUser({ body, files }))
);

const entityRoutes = routeFactory('users');
router.use('/', entityRoutes);

module.exports = router;
