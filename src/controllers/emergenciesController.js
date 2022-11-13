const moment = require('moment');
const { Op } = require('sequelize');

const serviceFactory = require('./../services/factories/serviceFactory');
const db = require('../config/initConnection');

const { EMERGENCY_STATUSES } = require('../constants/emergency-statuses');
const { EMERGENCY_TYPES } = require('../constants/emergency-types');

const {
  NotImplementedException,
} = require('../services/utilities/exceptionHandler');

const getAllEmergenciesByStatus = async ({ status }) => {
  const emergencyService = new serviceFactory('emergencies');
  const sequelize = await db();
  try {
    const emergency = await emergencyService.fetchAll({
      where: {
        emergency_status_id: EMERGENCY_STATUSES[status.toUpperCase()],
      },
      include: [
        {
          model: sequelize.models.users,
        },
        {
          model: sequelize.models.emergency_types,
        },
        {
          model: sequelize.models.emergency_statuses,
        },
      ],
    });
    return emergency;
  } catch (error) {
    console.error(error);
    throw new NotImplementedException(error.message);
  }
};

const getAllEmergenciesByUserIDAndStatus = async ({
  userID,
  emergencyStatusID,
}) => {
  const emergencyService = new serviceFactory('emergencies');
  const sequelize = await db();
  try {
    const emergencies = await emergencyService.fetchAll({
      where: {
        responder_id: userID,
        emergency_status_id: emergencyStatusID,
      },
      include: [
        {
          model: sequelize.models.users,
        },
        {
          model: sequelize.models.emergency_types,
        },
        {
          model: sequelize.models.emergency_statuses,
        },
      ],
    });
    return emergencies;
  } catch (error) {
    console.error(error);
    throw new NotImplementedException(error.message);
  }
};

const getEmergency = async ({ emergencyID }) => {
  const emergencyService = new serviceFactory('emergencies');
  const sequelize = await db();
  try {
    const emergency = await emergencyService.fetch({
      where: {
        id: emergencyID,
      },
      include: [
        {
          model: sequelize.models.users,
          include: [
            {
              model: sequelize.models.barangays,
            },
          ],
        },
        {
          model: sequelize.models.emergency_types,
        },
        {
          model: sequelize.models.emergency_statuses,
        },
        {
          model: sequelize.models.emergency_proofs,
        },
      ],
    });
    return emergency;
  } catch (error) {
    console.error(error);
    throw new NotImplementedException(error.message);
  }
};

const getAllCurrentEmergencies = async ({ body }) => {
  const { status, type } = body;
  const startDate = moment().startOf('year').toISOString();
  const endDate = moment().endOf('year').toISOString();

  const emergencyService = new serviceFactory('emergencies');
  const sequelize = await db();

  try {
    const emergencies = await emergencyService.fetchAll({
      where: {
        emergency_status_id: EMERGENCY_STATUSES[status.toUpperCase()],
        emergency_type_id: EMERGENCY_TYPES[type.toUpperCase()],
        date_added: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: sequelize.models.users,
        },
        {
          model: sequelize.models.emergency_types,
        },
        {
          model: sequelize.models.emergency_statuses,
        },
      ],
    });
    return emergencies;
  } catch (error) {
    console.error(error);
    throw error.statusCode ? error : new NotImplementedException(error.message);
  }
};

module.exports = {
  getAllEmergenciesByStatus,
  getEmergency,
  getAllEmergenciesByUserIDAndStatus,
  getAllCurrentEmergencies,
};
