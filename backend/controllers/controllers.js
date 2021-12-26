const User = require('./../model/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwt_sign = (id) => {
  return (token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_END,
  }));
};

let globalemail;

exports.signup = async (req, res) => {
  try {
    const newuser = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    globalemail = newuser._id;

    const token = await jwt_sign(newuser._id);

    res.status(200).json({
      status: 'success',
      token,
      message: 'successfully created new user',
    });
  } catch (err) {
    res.status(500).send('internal server error!');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send('please provide a valid email');

    const existsUser = await User.findOne({ email });

    globalemail = existsUser._id;

    if (!existsUser)
      return res.status(400).send('user does not exists please signup');

    const compare = await bcrypt.compare(password, existsUser.password);

    if (!compare) return res.status(400).send('password incorrect!');

    const token = await jwt_sign(existsUser._id);

    res.status(200).json({
      status: 'success',
      token,
      message: 'logged in successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('internal server error!');
  }
};

exports.getdata = async (req, res) => {
  try {
    globalemail = JSON.stringify(globalemail).slice(1, 25);

    const data = await User.findById({ _id: globalemail }, 'email');
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('internal server error!');
  }
};
