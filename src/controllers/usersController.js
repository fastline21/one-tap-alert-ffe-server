const { Op } = require('sequelize');

const serviceFactory = require('./../services/factories/serviceFactory');
const db = require('./../config/initConnection');

const { USER_TYPES } = require('../constants/user-types');

const getAllUsers = async () => {
  const sequelize = await db();
  const userService = new serviceFactory('users');

  return await userService.fetchAll({
    attributes: {
      exclude: [
        'password',
        'user_type_id',
        'date_added',
        'date_modified',
        'date_deleted',
      ],
    },
    include: [
      {
        model: sequelize.models.user_types,
        attributes: ['name'],
      },
    ],
  });
};

const registerUser = async ({ body, files }) => {
  const userService = new serviceFactory('users');

  const {
    first_name: firstName,
    middle_initial: middleInitial,
    last_name: lastName,
    address: address,
    barangay_id: barangayID,
    date_of_birth: dateOfBirth,
    email_address: emailAddress,
    zip_code: zipCode,
    username,
    password,
    password_2: password2,
    contact_no: contactNo,
    city,
    contact_person,
  } = body;
  const contactPerson = JSON.parse(contact_person);

  const users = await userService.fetchAll({
    where: {
      [Op.or]: [
        {
          username,
        },
        {
          email_address: emailAddress,
        },
      ],
    },
    limit: 1,
  });

  if (users.length) {
    throw Error(`${username} or ${emailAddress} is already exists.`);
  }

  const newPassword = password;

  const newUser = await userService.create({
    entry: {
      email_address: emailAddress,
      username,
      password: newPassword,
      user_type_id: USER_TYPES.RESIDENT,
      first_name: firstName,
      middle_initial: middleInitial,
      last_name: lastName,
    },
  });

  return newUser;
};

module.exports = {
  getAllUsers,
  registerUser,
};
