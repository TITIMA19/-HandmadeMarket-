const Material = require('../models/Material');

// Get all materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Server error getting materials' });
  }
};

// Get material by ID
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: 'Server error getting material' });
  }
};

// Create a new material
exports.createMaterial = async (req, res) => {
  try {
    const { name, category, description, price, imageBase64 } = req.body;
    const material = new Material({ name, category, description, price, imageBase64 });
    await material.save();
    res.status(201).json(material);
  } catch (err) {
    res.status(400).json({ message: 'Error creating material', error: err.message });
  }
};

// Update material
exports.updateMaterial = async (req, res) => {
  try {
    const { name, category, description, price, imageBase64 } = req.body;
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { name, category, description, price, imageBase64 },
      { new: true }
    );
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json(material);
  } catch (err) {
    res.status(400).json({ message: 'Error updating material', error: err.message });
  }
};

// Delete material
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json({ message: 'Material deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting material' });
  }
};
