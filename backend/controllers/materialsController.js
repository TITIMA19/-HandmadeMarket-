const Materials = require('../models/materials');

exports.createMaterial = async (req, res) => {
  try {
    const { title, description, image, categories, price } = req.body;

    const newMaterial = new Materials({
      title,
      description,
      image,         // Just the image string from JSON
      categories,
      price,
    });

    await newMaterial.save();
    res.status(201).json({ message: 'material created', material: newMaterial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all materials
exports.getAllmaterials = async(req,res)=>{
 try {
    const materials = await Materials.find();
    res.json({ materials }); // 👈 this must match frontend .data.materials
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get a specific material by ID
exports.getmaterialsById = async (req, res) => {
  const id = req.params.userId;
  
  try {
    const material = await Materials.findById(id);
    if (!material) {
      return res.status(404).json({ error: "material not found" });
    }
    res.json(material);
  } catch (error) {
    console.log("error while reading material of id ", id);
    return res.status(500).json({ error: "Server error" });
  }
};
// controllers/materialsController.js

exports.updateMaterial = async (req, res) => {
  const id = req.params.materialId;
  const { title, description,img,categories,price } = req.body;

  try {
    const updatedMaterial = await materials.findByIdAndUpdate(
      id,
      { title, description,img,categories,price },
      { new: true, runValidators: true }
    );

    if (!updatedMaterial) {
      return res.status(404).json({ error: "material not found" });
    }

    res.status(200).json(updatedMaterial);
  } catch (error) {
    console.error("Error updating material:", error.message);
    res.status(500).json({ error: "Failed to update material." });
  }
};

const mongoose = require("mongoose");

exports.deleteMaterial = async (req, res) => {
  const id = req.params.materialId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid material ID" });
  }

  try {
    const material = await Materials.findByIdAndDelete(id);
    
    if (!material) {
      return res.status(404).json({ error: "material not found" });
    }
    
    res.json(material);
  } catch (error) {
    console.error("Error while deleting material of id ", id, error.message);
    return res.status(500).json({ error: error.message });
  }
};
