module.exports = function verifyAdmin(req, res, next) {
  // req.user should be set by a previous auth middleware (e.g. verifyToken)
  if (req.user && req.user.role === 'admin') {
    next(); // user is admin, proceed
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};
