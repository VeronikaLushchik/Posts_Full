const jwt = require('jsonwebtoken');
const { validateAccessToken } = require('../servecies/token')

module.exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    decodedData = validateAccessToken(token)
    if (!decodedData) {
      return res.sendStatus(401);
    }

    req.userId = decodedData?.id;

    next();
  } catch (error) {
    return res.status(401);
  }
};
