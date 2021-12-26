const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        // console.log(el === this.password);
        return el === this.password;
      },
    },
    message: 'password are not same!',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
