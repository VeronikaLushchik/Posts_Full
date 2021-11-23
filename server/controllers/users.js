const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateTokens } = require('../servecies/token');
const ApiError = require('../servecies/errors')

refresh = async (req, res, next) => {
  const {refreshToken} = req.cookies
  
  if (!refreshToken) return next(ApiError.UnauthorizedError())
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return next(ApiError.ForbiddenError())
    const token = generateTokens({ user }).token
    res.json({ token })
  })
}

singin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  try {
    const isPasswordCorrect = await user.comparePassword(password);
    
    if (!isPasswordCorrect || !user) return next(ApiError.BadRequest('Incorrect data'));
    const tokens = generateTokens({...user})

    res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true})
    res.status(200).json({ result: user, token: tokens.token });
  } catch (err) {
   next(err)
  }
};

singup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  const photo = req?.file?.path;

  try {
    const user = await User.findOne({ email });
    if (user) return next(ApiError.BadRequest( "User already exists" ));

    const result = await User.create({photo, email, password, name: `${firstName} ${lastName}` });

    const tokens = generateTokens({...result})

    res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true})
    res.status(201).json({ result, token: tokens.token});
  } catch (err) {
      next(err)
   }
};

module.exports = { singin, singup, refresh }