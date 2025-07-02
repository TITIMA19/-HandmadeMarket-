   const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const productsSchema =new Schema({
   
    title:{
        type: String,
        required: true, 
    },
    description:{
        type: String,
        required: true,
    },
     image : { 
       type: String,
        required: true,
    },
     categories:{
        type: [String],
       
    },
     price:{
        type:Number,
    }
});
const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
