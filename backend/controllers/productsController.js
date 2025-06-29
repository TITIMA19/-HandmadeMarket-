const Products = require('../models/products');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, image, categories, price } = req.body;

    const newProduct = new Products({
      title,
      description,
      image,         // Just the image string from JSON
      categories,
      price,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created', Product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all Products
exports.getAllProducts = async(req,res)=>{
 try {
    const products = await Products.find();
    res.json({ products }); // 👈 this must match frontend .data.products
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get a specific product by ID
exports.getProductsById = async (req, res) => {
  const id = req.params.userId;
  
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log("error while reading product of id ", id);
    return res.status(500).json({ error: "Server error" });
  }
};
// controllers/productsController.js

exports.updateProduct = async (req, res) => {
  const id = req.params.productId;
  const { title, description,img,categories,price } = req.body;

  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { title, description,img,categories,price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ error: "Failed to update product." });
  }
};

const mongoose = require("mongoose");

exports.deleteProduct = async (req, res) => {
  const id = req.params.productId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await Products.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    
    res.json(product);
  } catch (error) {
    console.error("Error while deleting product of id ", id, error.message);
    return res.status(500).json({ error: error.message });
  }
};
