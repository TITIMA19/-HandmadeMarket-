const Visitor = require('../models/Visitor');

exports.getVisitorCount = async (req, res) => {
  const count = await Visitor.countDocuments();
  res.json({ visitors: count });
};

exports.recordVisitor = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  await Visitor.create({ ip });
  next();
};
