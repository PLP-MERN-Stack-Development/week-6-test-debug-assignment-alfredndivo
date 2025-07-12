const jwt = require('jsonwebtoken');
const User = require('./../models/User');

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).end();

  try {
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).end();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).end();
  }
};

module.exports = auth;
