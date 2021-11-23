const jwt = require('jsonwebtoken');
const { validateAccessToken } = require('../servecies/token')
const ApiError = require('../servecies/errors')

module.exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    decodedData = validateAccessToken(token)
    if (!decodedData) {
      return next(ApiError.UnauthorizedError());
    }

    req.userId = decodedData?.user?._id;

    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
