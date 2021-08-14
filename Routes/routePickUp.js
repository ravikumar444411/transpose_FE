const express = require('express');
const router=express.Router();
const pickupModel=require('../Models/pickupModel');
const sellersModel=require('../Models/sellersModel');
const shipmentModel=require('../Models/shipmentModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let postMenu=require('../Kafka/producer');

mongoose.Promise=global.Promise;

//POST request '/pickup/getPickup'
//This gives details of the pickup sheets. 
// Data Given back has fields _id(given by mongodb) id(required) title(required) sellers , shipments price date and location
router.get('/getPickup',(req,res) => {
    pickupModel.find({}).exec((err,data)=>{
        if(err){
             console.log('error users not found');
            res.send(err);
        }else{
            //  console.log(data);
            //res.json(data);
            res.send(data);
        }
    })
});

//POST request '/pickup/postPickup'
//to introduce new pickup ,this api is here.
// Data posted has fields _id(given by mongodb) id(required) title(required) sellers , shipments price date and location

router.post('/postPickup', urlencodedParser, async function (req, res) {
    
    const data=await req.body;
    const find=data.id;
    
    //here we try to find the number of sellers and shipments for a particular pickup 
    data.sellers=await sellersModel.countDocuments({relation:find});
    data.shipments=await shipmentModel.countDocuments({relation:find});
    const newUser=await new pickupModel(data);
   
    
    //this variable checks if our data is correct and according to our schema. (eg. if all the required value are there)
    const err=await newUser.validateSync();
    if(err){
        res.status(500).json({msg:'Sorry, internal Server errors',error:err});
    }else{
        //this function puts the new data in your database collection using kafka here we give topic name connected to sellers
        postMenu(newUser, "Test-Topics5");
        res.status(200).json({msg:'your data has been saved'});
    }
    
    
    // Below code is for emergency  if suddenly kafka stopped working Just uncomment and use 
    // await newUser.save((err)=>{
    //     if(err){
    //         res.status(500).json({msg:'Sorry, internal Server errors',error:err});
    //     }else{
    //         res.status(200).json({msg:'your data has been saved'})
    //     }
    // });

    //  res.json({msg:'your data has been saved'})

    
});



module.exports=router;

