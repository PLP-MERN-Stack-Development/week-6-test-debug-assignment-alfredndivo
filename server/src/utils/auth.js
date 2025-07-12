const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username },
    'secretkey', // You can use process.env.JWT_SECRET in production
    { expiresIn: '1d' }
  );
};

module.exports = { generateToken };
