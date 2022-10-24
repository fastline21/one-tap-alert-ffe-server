const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const serviceFactory = require('./../services/factories/serviceFactory');

const {
  BadRequestException,
  NotImplementedException,
} = require('../services/utilities/exceptionHandler');

const loginUser = async ({ body }) => {
  const userService = new serviceFactory('users');

  const { username, password } = body;

  if (!username || !password) {
    throw new BadRequestException('Please fill out all required fields');
  }

  try {
    const user = await userService.fetch({ where: { username } });

    if (!user) {
      throw new BadRequestException('Username not found');
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
    throw new NotImplementedException(error.message);
  }
};

const authUser = async ({ userID }) => {
  const userService = new serviceFactory('users');

  try {
    const user = await userService.fetch({
      where: {
        id: userID,
      },
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
