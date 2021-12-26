const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) return res.status(400).send('please login first');

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(400).send('please login again!');

    next();
  } catch (err) {
    res.status(500).send('internal server error');
  }
};
