const Material = require("../models/Material");

exports.createMaterial = async (req, res) => {
  const material = new Material(req.body);
  await material.save();
  res.status(201).json(material);
};

exports.getMaterials = async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
};

exports.updateMaterial = async (req, res) => {
  const updated = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteMaterial = async (req, res) => {
  await Material.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
