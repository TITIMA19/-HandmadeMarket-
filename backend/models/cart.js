const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const cartSchema =new Schema({
   
    userId:{
        type:String,
        
    },
    products:[{
        productId:{
        type:String,
    },
    quantity:{
        type:Number,
    }
    },],
    
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;