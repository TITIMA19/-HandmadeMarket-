const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.create = async (req, res) => {
  const { name, category, description, price, imageBase64 } = req.body;
  const product = new Product({ name, category, description, price, imageBase64 });
  await product.save();
  res.status(201).json(product);

};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, imageBase64 } = req.body;
  const product = await Product.findByIdAndUpdate(id, { name, category, description, price, imageBase64 }, { new: true });
  res.json(product);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};
