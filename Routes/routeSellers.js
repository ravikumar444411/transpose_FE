const express = require('express');
const router=express.Router();
const sellersModel=require('../Models/sellersModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let insertRecords = require('../OperationsModules/insertSellers');

mongoose.Promise=global.Promise;

router.get('/',(req,res,next)=>{
    let arr=[];
    arr.push({"/getMenu": ""});
    arr.push( { "/postMenu" :"for adding options"});
    res.send( arr);
})
    
router.get('/getSellers',async (req,res) => {
    //  console.log('get all users');
    const find=await req.query.id;
    
    sellersModel.find({relation:find}).exec((err,data)=>{
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

router.post('/postSellers', urlencodedParser, async function (req, res) {
    
    // console.log(req.body);
    const data=await req.body;
    // const newUser=await new sellersModel(data);
    
    // await newUser.save((err)=>{
    //     if(err){
    //         res.status(500).json({msg:'Sorry, internal Server errors',error:err});
    //     }else{
    //         res.status(200).json({msg:'your data has been saved'})
    //     }
    // });

    //  res.json({msg:'your data has been saved'})
    insertRecords(data);
    
});



module.exports=router;

