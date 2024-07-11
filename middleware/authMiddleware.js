// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    console.log('Invalid token format');
    return res.status(401).json({ message: 'Invalid token format' });
  }

  // Log the received token
  console.log('Received token:', token);

  jwt.verify(token, 'your-secret-key', (error, user) => {
    if (error) {
      console.log('Token verification failed:', error.message);
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
