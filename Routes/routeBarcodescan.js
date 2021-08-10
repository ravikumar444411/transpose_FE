
let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let Barcodescan = require('../Models/barcodescanModel');
let generateOTP = require('../OperationsModules/generateOTP');
let insertRecords = require('../OperationsModules/insertBarcode');

// GET request on '/barcode' route
router.get('/',(req,res)=> {
    res.status(200).send('Start scanning!');
});

// GET request on '/barcode/scan' route
router.get('/scan',(req,res)=> {

    res.status(200).send('Barcode scanning has started!');
});

// POST request on '/barcode/scan' route
router.post('/scan',bodyParser,(req,res)=> {

    let barcodeData = req.body.barcodeData;

    // generate OTP on barcode scan
    let otp = generateOTP();
    let barData = {
        barcodeData,
        otp,
        pending: true,
        completed: false,
        cancelled: false,
    };
    
    let data = {barcodeData};

    // checking whether a record with same barcode number exists or not
    Barcodescan.findOne(data).then((record)=> {

        if(record == null || record == undefined) {
            
            // insert record into the database if not already present
            insertRecords(barData);
        } else {

            // increment the count of otp generation for above barcode no.
            record.count++; 
            console.log(record);

            if(record.count > 5) {  

                // send status 500 for exceeding the otp generation limit
                res.status(500).send('OTP generation limit exceeded! Try again after 24 hours.');
            } else {

                barData.count = record.count;

                // update the already existing record with otp and barcode scan status
                Barcodescan.updateOne(data,{$set : barData}).then(record=> {
                    res.status(201).json({'otp':otp,'pending':true,'completed':false});
                }).catch(err=> {
                    res.status(500).send('Not able to save the barcode!');
                });
            }
        }
    });

});

// POST request on '/barcode/validate' route
router.post('/validate',bodyParser,(req,res)=> {
    
    let barcodeData = req.body.barcodeData;
    let userOTP = req.body.otp;
    let data = {barcodeData};

    // find the record with above barcode number
    Barcodescan.findOne({barcodeData: barcodeData}).then((rec)=> {

        if(rec == undefined || rec == null) {

            // send status 500 if barcode number does not exist
            res.status(500).send('Barcode Invalid! Please try again.');
        } else {

            // matching the input otp and actual otp
            if(rec.otp == userOTP) {

                rec.completed = true;
                rec.pending = false;
                rec.count = 0;
                rec.isSuccess = true;

                // updating the barcode scan status on otp validation
                Barcodescan.updateOne(data,{$set : rec}).then(record=> {
                    res.status(200).json({'msg':'Barcode scanning completed successfully!','pending':false,'completed':true});
                }).catch(err=> {
                    res.status(500).send('Not able to save the barcode!');
                });
            } else {
                res.status(404).send('Item not eligible for Pickup!');
            }
        }
    }).catch(err=> {
        console.log(err);
        res.status(500).json({'error':err});
    });
});

module.exports = router;