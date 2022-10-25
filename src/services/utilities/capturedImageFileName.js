const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

module.exports = capturedImageFileName;
