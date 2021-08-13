const express = require('express');
const router=express.Router();
const deliveryModel=require('../Models/deliveryModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let postDelivery=require('../Kafka/producer');

mongoose.Promise=global.Promise;

//GET request on '/delivery/getDelivery'
//getting all delivery details
router.get('/getDelivery',(req,res,next) => {
    
    deliveryModel.find().exec((err,data)=>{
        if(err){
             console.log('error users not found');
            res.send(err);
        }else{
             console.log(data);
            //res.json(data);
            res.send(data);
        }
    })
});

//POST request on '/delivery/postDelivery'
//posting new delivery 
router.post('/postDelivery', urlencodedParser, async function (req, res) {
    
    const data=await req.body;
    const newUser=await new deliveryModel(data);

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
        //this function puts the new data in seller database using kafka here we give topic name connected to sellers
        postDelivery(newUser, "Test-Topics2");
        res.status(200).json({msg:'your data has been saved'})
    }
});


module.exports=router;

