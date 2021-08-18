const express = require('express');
const router=express.Router();
const menuModel=require('../Models/menuModel');
const handOverModel=require('../Models/handoverModel');
const pickUpModel=require('../Models/pickupModel');
const deliveryModel=require('../Models/deliveryModel');
const shipmentModel=require('../Models/shipmentModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let postMenu=require('../Kafka/producer');

mongoose.Promise=global.Promise;

//GET request '/menu/getMenu'
//api for getting counts in the menu tab. This includes delivery , pickups and handover Counts
//getting latest information about delivery pickup and handover
router.get('/getMenu',async (req,res) => {

    //countDocuments count all documents from that collection for a specific condition here there is no condition
     const data= {
        deliveries:await shipmentModel.countDocuments({type:"Delivery"}),
        pickUp:await shipmentModel.countDocuments({type:"Pickup"}),
        handOver:await handOverModel.countDocuments({}),
        price:1222,
        id:Math.random(),
    }
    const newUser=await new menuModel(data);
    res.send(newUser);
});

//POST request '/menu/postMenu'
// post request to insert in the menu 
//actually puts latest information about delivery pickup and handover but is useless 
router.post('/postMenu', urlencodedParser, async function (req, res) {
    
    const data=await req.body;
    const newUser=await new menuModel(data);
   
    // Below code is for emergency  if suddenly kafka stopped working Just uncomment and use 
    // await newUser.save((err)=>{
    //     if(err){
    //         res.status(500).json({msg:'Sorry, internal Server errors'});
    //     }else{
    //         res.json({msg:'your data has been saved'})
    //     }
    // });
  
    
     //this variable checks if our data is correct and according to our schema. (eg. if all the required value are there)
    const err=newUser.validateSync();
    if(err){
        res.status(500).json({msg:'Sorry, internal Server errors',error:err});
    }else{
        //this function puts the new data in your database collection using kafka here we give topic name connected to sellers
        postSellers(newUser, "Test-Topics4");
        res.status(200).json({msg:'your data has been saved'});
    }
});



module.exports=router;

