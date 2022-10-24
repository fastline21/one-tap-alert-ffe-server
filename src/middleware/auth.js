const jwt = require('jsonwebtoken');

const authUserToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

const authRoute = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  const API_KEY = process.env.API_KEY;

  if (!apiKey) {
    return res.status(401).json({ error: 'No key, authorization denied' });
  }

  if (apiKey !== API_KEY) {
    res.status(401).json({ error: 'Key is not valid' });
  }

  next();
};

module.exports = {
  authUserToken,
  authRoute,
};
