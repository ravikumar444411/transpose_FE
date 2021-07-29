
let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let Barcodescan = require('../Models/barcodescanModel');
let generateOTP = require('../OperationsModules/generateOTP');

router.get('/',(req,res)=> {
    res.status(200).send('Start scanning!');
});

router.get('/scan',(req,res)=> {

    res.status(200).send('Barcode scanning has started!');
});

router.post('/scan',bodyParser,(req,res)=> {

    let barcodeData = req.body.barcodeData;
    let otp = generateOTP();
    let barcode = new Barcodescan({
        barcodeData,
        otp
    });
    let data = {barcodeData};

    Barcodescan.findOne(data).then((record)=> {

        if(record == null || record == undefined) {
            barcode.save((err)=> {
                if(err) {
                    res.status(500).send('Not able to save the barcode!');
                } else {
                    res.status(201).json({'otp':otp});
                }
            });
        } else {
            Barcodescan.updateOne(data,{$set : {otp}}).then(record=> {
                res.status(201).json({'otp':otp});
            }).catch(err=> {
                res.status(500).send('Not able to save the barcode!');
            });
        }
    });

});

router.post('/validate',bodyParser,(req,res)=> {
    
    let barcodeData = req.body.barcodeData;
    let userOTP = req.body.otp;

    Barcodescan.findOne({barcodeData}).then((record)=> {

        if(record == undefined || record == null) {
            res.status(500).send('Barcode Invalid! Please try again.');
        } else {
            if(JSON.stringify(record.otp) == userOTP) {
                res.status(200).send('Barcode scanning completed successfully!');
            } else {
                res.status(404).send('Item not eligible for Pickup!');
            }
        }
    }).catch(err=> {
        res.status(500).json({'error':err});
    });
});

module.exports = router;