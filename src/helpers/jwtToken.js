require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
};

const createToken = (data) => {
  const token = jwt.sign(data, JWT_SECRET, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

module.exports = {
  createToken,
  verifyToken
};
