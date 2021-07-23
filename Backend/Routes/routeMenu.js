const express = require('express');
const router=express.Router();
const menuModel=require('../Models/modelMenu');
const mongoose=require('mongoose');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.Promise=global.Promise;


router.get('/',(req,res,next)=>{
    let arr=[];
    arr.push({"/getMenu": ""});
    arr.push( { "/postMenu" :"for adding options"});
    res.send( arr);
})
    
router.get('/getMenu',(req,res) => {
    //  console.log('get all users');
    menuModel.find().exec((err,data)=>{
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

router.post('/postMenu', urlencodedParser, async function (req, res) {
    
    console.log(req.body);
    const data=await req.body;
    const newUser=await new menuModel(data);
   
    await newUser.save((err)=>{
        if(err){
            res.status(500).json({msg:'Sorry, internal Server errors'});
        }else{
            res.json({msg:'your data has been saved'})
        }
    });

     res.json({msg:'your data has been saved'})

    
});



module.exports=router;

