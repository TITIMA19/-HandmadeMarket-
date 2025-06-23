const Products = require('../models/products');

exports.createProducts = async(req,res)=>{
const newProducts =new Products();
const productstitle = req.body.title;
const productsdescription = req.body.description;
const productsimg= req.body.img
const productscategories= req.body.categories
const productsprice= req.body.price
newProducts.title =productstitle;
newProducts.description=productsdescription;
newProducts.img=productsimg;
newProducts.categories=productscategories;
newProducts.price=productsprice;
try{
    await newProducts.save();
    res.json(newProducts);
} catch (error){
    console.error("Error creating user:", error.message);
     res.status(400).json({ error: error.message });
}
};
// Get all Products
exports.getAllProducts = async(req,res)=>{
try {
    const products = await Products.find({});
    console.log("the products are", products );
      res.json({
            products: products,
            statistics: {
                total: products.length
            }
        });
} catch (error){
    console.log("Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
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
