const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], 'your_jwt_secret');
    req.user = decoded; // attach user info to the request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.userMiddleware = (req, res, next) => {
   console.log("User role:", req.user);
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied. User resource only.' });
  }
  next();
};
