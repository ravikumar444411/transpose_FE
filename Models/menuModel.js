let mongoose=require('mongoose');
// let db = require('../database');
// create an schema

let menuSchema = new mongoose.Schema({
        id:{type: String,required:true},
        deliveries:{
          type: Number,
          default:0
        },
        pickUp:{
          type: Number,
          default:0
        },
        handOver:{
          type: Number,
          default:0
        },
        price: { type: Number, 
          required: true,
          default:0 
        },
        
    },{timestamps:true});

module.exports=mongoose.model("Menu",menuSchema,"Menu");


        