const express = require('express');
const router=express.Router();
const shipmentModel=require('../Models/shipmentModel');
const mongoose=require('mongoose');
let dbConnect = require('../DB-Connect/connect-db');
// const DB='mongodb+srv://new-user1:SptGo9T4Kg4W9PbL@cluster0.mp33i.mongodb.net/logistiexdb?retryWrites=true&w=majority';
var bodyParser = require('body-parser');
const { findById } = require('../Models/shipmentModel');
const pickupModel=require('../Models/pickupModel');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.Promise=global.Promise;

router.get('/',(req,res,next)=>{
    let arr=[];
    arr.push({"/getShipments": ""});
    arr.push( { "/postShipments" :"for adding options"});
    res.send( arr);
})
    
router.get('/getShipments',async (req,res) => {
    
    
    shipmentModel.find().exec((err,data)=>{
        if(err){
             console.log('error users not found');
            res.send(err);
        }else{
            //  console.log(data);
            //res.json(data);
            res.send(data);
        }
    });
});
router.get('/getShipmentsWithId',async (req,res) => {
    //  console.log('get all users');
    const find=await req.query.id;
    
    shipmentModel.find({relation:find}).exec((err,data)=>{
        if(err){
             console.log('error users not found');
            res.send(err);
        }else{
            //  console.log(data);
            //res.json(data);
            res.send(data);
        }
    });
});
router.post('/postShipments', urlencodedParser, async function (req, res) {
    
    // console.log(req.body);
    
    const data=await req.body;
    const newUser=await new shipmentModel(data);
    await newUser.save((err)=>{
        if(err){
            res.status(500).json({msg:'Sorry, internal Server errors',error:err});
        }
    });
   
    await pickupModel.find({id:data.relation}).exec(async (err,datas)=>{
        if(err){
             console.log('error pickup not found');
            //res.send(err);
        }else{
            // console.log(data.relation);
            const updatedShipments=await shipmentModel.countDocuments({relation:data.relation});
            const filter= {id:data.relation};
            const update= {shipments:updatedShipments};
            await pickupModel.findOneAndUpdate(filter,update);
            // value=datas.shipments;

            res.status(200).json({msg:'your data has been saved'});
            
        }
    });

    

    

    //  res.json({msg:'your data has been saved'})

    
});
router.put('/shipmentDelivered', urlencodedParser, async function (req, res) {
    
    // console.log(req.body);
    const find=await req.query.id;
    // const id = Object.id(find);
    const filter = { _id: find };
    const update={delivered:true}    
    shipmentModel.findOneAndUpdate(filter,update).exec((err,data)=>{
        if(err){
             console.log('error users not found');
            res.send(err);
        }else{
            //  console.log(data);
            //res.json(data);
            res.send('Item Delivered');
        }
    })
    //  res.json({msg:'your data has been saved'})

    
});


module.exports=router;

