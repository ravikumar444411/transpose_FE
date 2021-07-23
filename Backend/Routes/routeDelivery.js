const express = require('express');
const router=express.Router();
const deliveryModel=require('../Models/deliveryModel');
const mongoose=require('mongoose');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.Promise=global.Promise;
    
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

router.post('/postDelivery', urlencodedParser, async function (req, res) {
    
    // console.log(req.body);
    const data=await req.body;
    console.log(data);
    const newUser=await new deliveryModel(data);
    console.log(newUser);
    await newUser.save((err)=>{
        if(err){
            res.status(500).json({msg:'Sorry, internal Server errors'});
        }else{
            res.json({msg:'your data has been saved'})
        }
    });

    
});


module.exports=router;

