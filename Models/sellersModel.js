let mongoose=require('mongoose');

//this is incomplete and wrong
let menuSchema = new mongoose.Schema({
    id:{type: String,required:true},
    code:{
        type:Number,    //specific code connected to a seller
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