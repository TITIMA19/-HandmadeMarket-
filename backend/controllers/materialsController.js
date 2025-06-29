const Materials = require('../models/materials');

exports.createMaterials = async (req, res) => {
    try {
        // Check if the file is uploaded
        // if (!req.file) {
        //     return res.status(400).json({ error: "Image is required." });
        // }

        // Create a new instance of the Materials model
        const newMaterial = new Materials({
            title: req.body.title,
            description: req.body.description,
            image: req.file.filename, // Use the filename from the uploaded file
            categories: req.body.categories, // Ensure this is an array
            price: req.body.price,
        });

        // Save the new Material to the database
        await newMaterial.save();
        
        // Respond with the created product
        res.status(201).json(newMaterial);
    } catch (error) {
        console.error("Error creating Material:", error.message);
        res.status(500).json({ error: error.message }); // Handle unexpected errors
    }
};
// Get all Materials
exports.getAllMaterials = async(req,res)=>{
try {
    const materials = await Materials.find({});
    console.log("the Materials are", materials );
      res.json({
            Materials: materials,
            statistics: {
                total: materials.length
            }
        });
} catch (error){
    console.log("Error fetching materials:", error.message);
    res.status(500).json({ error: "Failed to fetch materials" });
}
};
// Get a specific Material by ID
exports.getMaterialsById = async (req, res) => {
  const id = req.params.userId;
  
  try {
    const material = await Materials.findById(id);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.json(material);
  } catch (error) {
    console.log("error while reading material of id ", id);
    return res.status(500).json({ error: "Server error" });
  }
};
// controllers/MaterialsController.js

exports.updateMaterial = async (req, res) => {
  const id = req.params.materialId;
  const { title, description,img,categories,price } = req.body;

  try {
    const updatedMaterial = await Materials.findByIdAndUpdate(
      id,
      { title, description,img,categories,price },
      { new: true, runValidators: true }
    );

    if (!updatedMaterial) {
      return res.status(404).json({ error: "Material not found" });
    }

    res.status(200).json(updatedMaterial);
  } catch (error) {
    console.error("Error updating Material:", error.message);
    res.status(500).json({ error: "Failed to update Material." });
  }
};

const mongoose = require("mongoose");

exports.deleteMaterial = async (req, res) => {
  const id = req.params.MaterialId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Material ID" });
  }

  try {
    const material = await Materials.findByIdAndDelete(id);
    
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    
    res.json(material);
  } catch (error) {
    console.error("Error while deleting Material of id ", id, error.message);
    return res.status(500).json({ error: error.message });
  }
};
