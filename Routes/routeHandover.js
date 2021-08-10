const express = require('express');
const router=express.Router();
const handoverModel=require('../Models/handoverModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let insertRecords = require('../OperationsModules/insertHandover');

mongoose.Promise=global.Promise;


router.get('/',(req,res,next)=>{
    let arr=[];
    arr.push({"/getMenu": ""});
    arr.push( { "/postMenu" :"for adding options"});
    res.send( arr);
})
    
router.get('/getHandover',(req,res) => {
    //  console.log('get all users');
    handoverModel.find({"name":"l"}).exec((err,data)=>{
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

router.post('/postHandover', urlencodedParser, async function (req, res) {
    
    console.log(req.body);
    const data=await req.body;
    // const newUser=await new handoverModel(data);
   
    // await newUser.save((err)=>{
    //     if(err){
    //         res.status(500).json({msg:'Sorry, internal Server errors'});
    //     }else{
    //         res.json({msg:'your data has been saved'})
    //     }
    // });

    //  res.json({msg:'your data has been saved'})

    insertRecords(data);
});



module.exports=router;

