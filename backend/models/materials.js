 const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const materialsSchema =new Schema({
   
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
        type:Array,
    },
     price:{
        type:Number,
    }
});
const Materials = mongoose.model("Materials", materialsSchema);

module.exports = Materials;
