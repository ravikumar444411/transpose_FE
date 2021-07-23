let mongoose=require('mongoose');
// let db = require('../database');
// create an schema

let handoverSchema=new mongoose.Schema({
    id:{type:String,required:true},
    title: { type: String, required: true },
    sellers:{type:Number},
    shipments:{type:Number},
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    location: {
        type: String,
        //required: true, 
    }
},{timestamps:true});

module.exports=mongoose.model("HandOver",handoverSchema,"HandOver");


        