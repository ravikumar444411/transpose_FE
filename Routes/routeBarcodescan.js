
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
        otp,
        pending: true,
        completed: false,
        cancelled: false
    });
    let data = {barcodeData};

    Barcodescan.findOne(data).then((record)=> {

        if(record == null || record == undefined) {
            barcode.save((err)=> {
                if(err) {
                    res.status(500).send('Not able to save the barcode!');
                } else {
                    res.status(201).json({'otp':otp,'pending':true,'completed':false});
                }
            });
        } else {

            record.count++;

            if(record.count > 3) {
                res.status(500).send('OTP generation limit exceeded! Try again after 24 hours.');
            } else {

                barcode.count = record.count;

                Barcodescan.updateOne(data,{$set : barcode}).then(record=> {
                    res.status(201).json({'otp':otp,'pending':true,'completed':false});
                }).catch(err=> {
                    res.status(500).send('Not able to save the barcode!');
                });
            }
        }
    });

});

router.post('/validate',bodyParser,(req,res)=> {
    
    let barcodeData = req.body.barcodeData;
    let userOTP = req.body.otp;

    Barcodescan.findOne({barcodeData: barcodeData}).then((record)=> {

        if(record == undefined || record == null) {
            res.status(500).send('Barcode Invalid! Please try again.');
        } else {
            if(record.otp == userOTP) {

                record.completed = true;
                record.pending = false;
                record.count = 0;

                res.status(200).json({'msg':'Barcode scanning completed successfully!','pending':false,'completed':true});
            } else {
                res.status(404).send('Item not eligible for Pickup!');
            }
        }
    }).catch(err=> {
        res.status(500).json({'error':err});
    });
});

module.exports = router;