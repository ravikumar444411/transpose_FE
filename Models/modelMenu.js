let mongoose=require('mongoose');
// let db = require('../database');
// create an schema

let subPickUpSchema=new mongoose.Schema({
    id:{type:String,required:true},
    title: { type: String, required: true },
    sellers:{type:Number},
    shipments:{type:Number}
});
let menuSchema = new mongoose.Schema({
        id:{type: String,required:true},
        title: { 
          type: String, 
          required: true 
        },
        deliveries:{type: Number},
        pickUp:[subPickUpSchema],
        handOver:{
          type: Number,
          default:0
        },
        price: { type: Number, 
          required: true,
          default:0 
        },
        date:{
            type:Date,
            required:true,
            default:Date.now()
        },
        location: {
            type: String,
            required: true, 
        }
        
    },{timestamps:true});

module.exports=mongoose.model("Menus",menuSchema,"Menu");


        