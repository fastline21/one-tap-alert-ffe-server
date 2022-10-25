const path = require('path');
const fs = require('fs');

const serviceFactory = require('./../services/factories/serviceFactory');

const {
  BadRequestException,
  NotImplementedException,
} = require('../services/utilities/exceptionHandler');

const capturedImageFileName = require('../services/utilities/capturedImageFileName');

const submitEmergencyProof = async ({ body, files }) => {
  const emergencyService = new serviceFactory('emergencies');
  const emergencyProofService = new serviceFactory('emergency_proofs');

  try {
    const {
      user_id: userID,
      emergency_id: emergencyID,
      emergency_category_id: emergencyCategoryID,
    } = body;
    const { captured_image_proof } = files;

    if (!userID || !emergencyID || !emergencyCategoryID) {
      throw new BadRequestException('Please fill out all required fields');
    }

    await emergencyService.fetch({
      where: {
        id: emergencyID,
      },
    });

    const uploadPathDir = path.join(
      path.resolve('./'),
      'upload',
      'captured-image'
    );

    if (!fs.existsSync(uploadPathDir)) {
      fs.mkdirSync(uploadPathDir, { recursive: true });
    }

    const capturedImageProof = capturedImageFileName({
      uploadPathDir,
      name: captured_image_proof.name,
    });
    captured_image_proof.mv(capturedImageProof.uploadPath);

    const result = await emergencyProofService.create({
      entry: {
        user_id: userID,
        emergency_id: emergencyID,
        emergency_category_id: emergencyCategoryID,
        file: capturedImageProof.file,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new NotImplementedException(error.message);
  }
};

module.exports = { submitEmergencyProof };
