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
let insertRecords = require('../OperationsModules/insertPickup');

mongoose.Promise=global.Promise;

//POST request '/pickup/getPickup'
//This gives details of the pickup sheets. 
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
router.post('/postPickup', urlencodedParser, async function (req, res) {
    
    // console.log(req.body);
    const data=await req.body;
    const find=data.id;
    // const newUser=await new pickupModel(data);
    // data.sellers=await sellersModel.countDocuments({});


    //here we try to find the no, of sellers and shipments for a particular pickup 
    data.sellers=await sellersModel.countDocuments({relation:find});
    data.shipments=await shipmentModel.countDocuments({relation:find});

    //this funcion uses kafka /// code commented below also works and both have same effect 
    insertRecords(data);

    
    
    // const newUser=await new pickupModel(data);
    // newUser.sellers=await sellersModel.countDocuments({relation:find});
    // newUser.shipments=await shipmentModel.countDocuments({relation:find});
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

