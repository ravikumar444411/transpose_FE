let mongoose=require('mongoose');
// let db = require('../database');
// create an schema

let pickUpSchema=new mongoose.Schema({
    id:{type:String,required:true},
    title: { type: String, required: true },
    sellers:{type:Number},
    shipments:{type:Number},
    price: { type: Number, 
        required: true,
        default:0 
    },
    date:{
        type:Date,
        // required:true,
        default:Date.now()
    },
    location: {
        type: String,
        // required: true, 
    }
},{timestamps:true});

module.exports=mongoose.model("Pickup",pickUpSchema,"Pickup");


        