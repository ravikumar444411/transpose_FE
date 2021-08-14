const express = require('express');
const router=express.Router();
const sellersModel=require('../Models/sellersModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// let insertRecords = require('../OperationsModules/insertSellers');
let postSellers = require('../Kafka/producer');
mongoose.Promise=global.Promise;

//GET request on '/sellers/getSellers'
//here you can get seller details related to a particular pickup.
// Data Given back has fields _id(given by mongodb) id code  relation , seller address
router.get('/getSellers',async (req,res) => {
    
    const find=await req.query.id;

    // find is the connection id to the pickup sheets
    sellersModel.find({relation:find}).exec((err,data)=>{
        if(err){
             console.log('error users not found');
            res.send(err);
        }else{
            res.send(data);
        }
    })
});

//POST request on '/sellers/postSellers'
// posting details of new sellers , see model for details
// Data posted has fields _id(given by mongodb) id code  relation , seller address all required
router.post('/postSellers', urlencodedParser, async function (req, res) {
    
    // console.log(req.body);
    const data=await req.body;
    const newUser=await new sellersModel(data);
    
    //this variable checks if our data is correct and according to our schema. (eg. if all the required value are there)
    const err=newUser.validateSync();
    if(err){
        res.status(500).json({msg:'Sorry, internal Server errors',error:err});
    }else{
        //this function puts the new data in seller database using kafka here we give topic name connected to sellers
        postSellers(newUser, "Test-Topics7");
        res.status(200).json({msg:'your data has been saved'})
    }


    // Below code is for emergency  if suddenly kafka stopped working Just uncomment and use 
    // await newUser.save((err)=>{
    //     if(err){
    //         res.status(500).json({msg:'Sorry, internal Server errors',error:err});
    //     }else{
    //         res.status(200).json({msg:'your data has been saved'})
    //     }
    // });

    //  

    
    
});



module.exports=router;

