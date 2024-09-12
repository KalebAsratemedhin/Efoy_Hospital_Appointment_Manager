const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("token", token)

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
