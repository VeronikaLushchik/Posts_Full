const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

const userSchema = Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
  });

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
          user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async function(password) {
  
  return await bcrypt.compare(password, this.password);
};

  module.exports = mongoose.model('User', userSchema)