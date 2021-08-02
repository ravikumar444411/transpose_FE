let mongoose=require('mongoose');
let menuSchema = new mongoose.Schema({
    id:{type: String,required:true},
    code:{
        type:Number,
        required:true
    },
    relation:{
      type: String ,
      required:true
    },
    seller:{
      type: String,
      required:true
    },
    address:{
      type: String,
      required:true,
    }
},{timestamps:true});

module.exports=mongoose.model("Sellers",menuSchema,"Sellers");