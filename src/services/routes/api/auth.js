const { Router } = require('express');
const router = new Router();

const expressWrapper = require('./../../utilities/expressWrapper');

const { authUserToken } = require('../../../middleware/auth');

const {
  loginUser,
  authUser,
} = require('./../../../controllers/authController');

router.post(
  '/',
  expressWrapper(({ body }) => loginUser({ body }))
);

router.get(
  '/',
  authUserToken,
  expressWrapper((req) => authUser({ userID: req.user.id }))
);

module.exports = router;
