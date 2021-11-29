const jwt = require('jsonwebtoken');

module.exports.validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.SECRET);
        return userData;
    } catch (e) {
        return null;
    }
  }

module.exports.generateTokens = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'})
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '1d'})
    return {
        token,
        refreshToken,
    }
}

module.exports.validateRefreshToken = (refreshToken) => {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return next(ApiError.ForbiddenError())
        const token = generateTokens({ user }).token
        return token
    })
}
