const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number
});

module.exports = mongoose.model("Material", materialSchema);
