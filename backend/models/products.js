   const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const productsSchema =new Schema({
   
    title:{
        type:String,
        
    },
    description:{
        type:String,
    },
     img:{
        type:String,
    },
     categories:{
        type:Array,
    },
     price:{
        type:Number,
    }
});
const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
