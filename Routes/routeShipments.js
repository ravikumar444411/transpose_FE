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

//GET request on '/shipments/getShipments'
// getting all the shipments 
router.get('/getShipments',async (req,res) => {
    
    
    shipmentModel.find().exec((err,data)=>{
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

//GET request on '/shipments/getShipmentsWithId'
//getting particular shipments related to a pickup time or charge sheet 
router.get('/getShipmentsWithId',async (req,res) => {
    //getting id from query parameter send to us
    const find=await req.query.id;
    
    shipmentModel.find({relation:find}).exec((err,data)=>{
        if(err){
             console.log('error users not found');
            res.send(err);
        }else{
           
            res.send(data);
        }
    });
});

//POST request on '/shipments/postShipments'
// posting new shipments to our Shipments Database
// Data you get has fields _id(given by mongodb) id code  relation , seller address phone location  and also delivered with defualt value false
router.post('/postShipments', urlencodedParser, async function (req, res) {
    
    //getting shipment info and saving it
    const data=await req.body;
    const newUser=await new shipmentModel(data);
    await newUser.save((err)=>{
        if(err){
            res.status(500).json({msg:'Sorry, internal Server errors',error:err});
        }
    });
   
    //updating our count in pickupModel
    await pickupModel.find({id:data.relation}).exec(async (err,datas)=>{
        if(err){
             console.log('error pickup not found');
         
        }else{
            //getting count of our overall shipments
            const updatedShipments=await shipmentModel.countDocuments({relation:data.relation});
            const filter= {id:data.relation};
            const update= {shipments:updatedShipments};
            
            //updating our pickup sheets when a new shipment is added
            await pickupModel.findOneAndUpdate(filter,update);
            // value=datas.shipments;

            res.status(200).json({msg:'your data has been updated'});
            
        }
    });

});

//PUT request on '/shipments/shipmentDelivered'
// change request when one of the shipments is delivered. Just changing delivery status to true
// Data posted has fields _id(given by mongodb) id code  relation , seller address phone location  all required  and also delivered with defualt value false
router.put('/shipmentDelivered', urlencodedParser, async function (req, res) {
    
   
    const find=await req.query.id;
   
    const filter = { _id: find };
    const update={delivered:true}    

    //updating our particular shipment of _id: find  to true , stating that it has been delivered
    shipmentModel.findOneAndUpdate(filter,update).exec((err,data)=>{
        if(err){
            res.send(err);
        }else{        
            res.send('Item Delivered');
        }
    })
});


module.exports=router;

