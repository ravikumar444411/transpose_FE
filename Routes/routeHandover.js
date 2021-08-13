//all the necessary requirments
const express = require('express');
const router=express.Router();
const handoverModel=require('../Models/handoverModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let postHandover=require('../Kafka/producer');

mongoose.Promise=global.Promise;

//GET request '/handover/getHandover'
//gettnig handover details with a specific name  you can change the data with your condition
router.get('/getHandover',(req,res) => {
    
    // condition name: l
    handoverModel.find({"name":"l"}).exec((err,data)=>{
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
});

//POST request '/handover/postHandover'
//posting new Handover data
router.post('/postHandover', urlencodedParser, async function (req, res) {
    
   
    const data=await req.body;
    const newUser=await new handoverModel(data);
   
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
        //this function puts the new data in your database collectione using kafka here we give topic name connected to sellers
        postHandover(newUser, "Test-Topics3");
        res.status(200).json({msg:'your data has been saved'})
    }
});



module.exports=router;

