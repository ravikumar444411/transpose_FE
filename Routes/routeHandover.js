//all the necessary requirments
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

    //function doing same thing as above commented code . Just using kafka to do it
    insertRecords(data);
});



module.exports=router;

