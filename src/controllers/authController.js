const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const serviceFactory = require('./../services/factories/serviceFactory');
const db = require('../config/initConnection');

const {
  BadRequestException,
  NotImplementedException,
  UnauthorizedException,
} = require('../services/utilities/exceptionHandler');

const { USER_STATUSES } = require('../constants/user-statuses');

const loginUser = async ({ body }) => {
  const userService = new serviceFactory('users');

  const { username, password, user_type_ids } = body;

  if (!username || !password) {
    throw new BadRequestException('Please fill out all required fields');
  }

  try {
    const user = await userService.fetch({
      where: {
        username,
      },
    });

    if (!user_type_ids.includes(user.user_type_id)) {
      throw new UnauthorizedException('You are not authorized to login');
    }

    if (user.user_status_id !== USER_STATUSES.APPROVED) {
      throw new UnauthorizedException('You are not authorized to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return {
      token,
    };
  } catch (error) {
    console.error(error);
    throw error.statusCode ? error : new NotImplementedException(error.message);
    // throw new NotImplementedException(error.message);
  }
};

const authUser = async ({ userID }) => {
  const userService = new serviceFactory('users');
  const sequelize = await db();

  try {
    const user = await userService.fetch({
      where: {
        id: userID,
        user_status_id: USER_STATUSES.APPROVED,
      },
      include: [
        {
          model: sequelize.models.user_types,
        },
        {
          model: sequelize.models.barangays,
        },
        {
          model: sequelize.models.contact_persons,
        },
      ],
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new NotImplementedException(error.message);
  }
};

module.exports = {
  loginUser,
  authUser,
};
