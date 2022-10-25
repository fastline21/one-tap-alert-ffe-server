const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const serviceFactory = require('./../services/factories/serviceFactory');
const db = require('./../config/initConnection');

const { USER_TYPES } = require('../constants/user-types');
const { USER_STATUSES } = require('../constants/user-statuses');

const {
  BadRequestException,
  NotImplementedException,
} = require('../services/utilities/exceptionHandler');

const capturedImageFileName = ({ uploadPathDir, name }) => {
  const filename = uuidv4();
  const fileExt = path.extname(name);
  const file = `${filename}${fileExt}`;
  const uploadPath = path.resolve(uploadPathDir, file);

  return {
    file,
    uploadPath,
  };
};

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
  const contactPersonService = new serviceFactory('contact_persons');

  try {
    const {
      first_name: firstName,
      middle_initial: middleInitial,
      last_name: lastName,
      address,
      barangay_id: barangayID,
      email_address: emailAddress,
      zip_code: zipCode,
      username,
      password,
      password_2: password2,
      contact_no: contactNo,
      city,
      contact_person,
      user_type_id: userTypeID,
    } = body;
    const contactPerson = JSON.parse(contact_person);
    const {
      captured_image_front_id,
      captured_image_back_id,
      captured_image_selfie,
    } = files;

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
      throw new BadRequestException(
        `${username} or ${emailAddress} is already exists`
      );
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(String(password), salt);

    const uploadPathDir = path.join(
      path.resolve('./'),
      'upload',
      'captured-image'
    );

    if (!fs.existsSync(uploadPathDir)) {
      fs.mkdirSync(uploadPathDir, { recursive: true });
    }

    const capturedImageFrontID = capturedImageFileName({
      uploadPathDir,
      name: captured_image_front_id.name,
    });
    captured_image_front_id.mv(capturedImageFrontID.uploadPath);

    const capturedImageBackID = capturedImageFileName({
      uploadPathDir,
      name: captured_image_back_id.name,
    });
    captured_image_back_id.mv(capturedImageBackID.uploadPath);

    const capturedImageSelfie = capturedImageFileName({
      uploadPathDir,
      name: captured_image_selfie.name,
    });
    captured_image_selfie.mv(capturedImageSelfie.uploadPath);

    const user = await userService.create({
      entry: {
        user_type_id: USER_TYPES.RESIDENT,
        first_name: firstName,
        middle_initial: middleInitial,
        last_name: lastName,
        address: address,
        barangay_id: barangayID,
        email_address: emailAddress,
        zip_code: zipCode,
        username,
        password: newPassword,
        password_2: password2,
        contact_no: `+63${contactNo}`,
        city,
        user_status_id: USER_STATUSES.PENDING,
        captured_image_front_id: capturedImageFrontID.file,
        captured_image_back_id: capturedImageBackID.file,
        captured_image_selfie: capturedImageSelfie.file,
      },
    });

    await contactPersonService.create({
      entry: {
        user_id: user.id,
        first_name: contactPerson.first_name,
        last_name: contactPerson.last_name,
        contact_no: `+63${contactPerson.contact_no}`,
        email_address: contactPerson.email_address,
      },
    });

    return { message: 'You successfully register user' };
  } catch (error) {
    console.error(error);
    throw new NotImplementedException(error.message);
  }
};

module.exports = {
  getAllUsers,
  registerUser,
};
