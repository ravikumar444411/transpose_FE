const express = require('express');
const router=express.Router();
const deliveryModel=require('../Models/deliveryModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let insertRecords = require('../OperationsModules/insertDelivery');

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
    console.log(data);
    // const newUser=await new deliveryModel(data);
    // console.log(newUser);
    // await newUser.save((err)=>{
    //     if(err){
    //         res.status(500).json({msg:'Sorry, internal Server errors'});
    //     }else{
    //         res.json({msg:'your data has been saved'})
    //     }
    // });

    //this function does same as above commented code
    insertRecords(data);
    
});


module.exports=router;

