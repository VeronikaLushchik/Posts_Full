const jwt = require('jsonwebtoken');

module.exports.validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.SECRET);
        return userData;
    } catch (e) {
        return null;
    }
  }