const { Router } = require('express');

const expressWrapper = require('./../../utilities/expressWrapper');

const { loginUser } = require('./../../../controllers/authController');

const router = new Router();

module.exports = router;
