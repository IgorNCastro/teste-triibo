const jwt = require('../helpers/jwtToken');

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();

  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  checkToken
};
