
let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let Qrcodescan = require('../Models/qrcodescanModel');
let generateOTP = require('../OperationsModules/generateOTP');
let postQrcode = require('../Kafka/producer');

// GET request on '/qrcode' route
router.get('/',(req,res)=> {
    res.status(200).send('Start scanning!');
});

// GET request on '/qrcode/scan' route
router.get('/scan',(req,res)=> {

    res.status(200).send('qrcode scanning has started!');
});

// POST request on '/qrcode/scan' route
router.post('/scan',bodyParser,(req,res)=> {

    let qrcodeData = req.body.qrcodeData;

    // generating otp on qrcode scan
    let otp = generateOTP();
    let qrData = {
        qrcodeData,
        otp,
        pending: true,
        completed: false,
        cancelled: false
    };
    
    let data = {qrcodeData};

    // checking whether a record with same qrcode number exists or not
    Qrcodescan.findOne(data).then((record)=> {

        if(record == null || record == undefined) {
            
            // insert record into the database if not already present
            let qrcode = new Qrcodescan(qrData);
            let err = qrcode.validateSync();

            if(err == undefined) {
                postQrcode(qrData,"Test-Topics6");
                res.status(201).json({'otp':otp,'pending':true,'completed':false});
            } else {
                res.status(500).json({'msg':'All required fields not covered'});
            }
            
        } else {

            // increment the count of otp generation for above qrcode no.
            record.count++; 
            console.log(record);

            if(record.count > 5) {

                // send status 500 for exceeding the otp generation limit
                res.status(500).send('OTP generation limit exceeded! Try again after 24 hours.');
            } else {

                qrData.count = record.count;

                // update the already existing record with otp and qrcode scan status
                Qrcodescan.updateOne(data,{$set : qrData}).then(record=> {
                    res.status(201).json({'otp':otp,'pending':true,'completed':false});
                }).catch(err=> {
                    res.status(500).send('Not able to save the qrcode!');
                });
            }
            
        }
    });

});

// POST request on '/qrcode/validate' route
router.post('/validate',bodyParser,(req,res)=> {
    
    let qrcodeData = req.body.qrcodeData;
    let userOTP = req.body.otp;
    let data = {qrcodeData};

    // find the record with above qrcode number
    Qrcodescan.findOne({qrcodeData:qrcodeData}).then((rec)=> {

        if(rec == undefined || rec == null) {

            // send status 500 if qrcode number does not exist
            res.status(500).send('qrcode Invalid! Please try again.');
        } else {

            // matching the input otp and actual otp
            if(rec.otp == userOTP) {

                rec.completed = true;
                rec.pending = false;
                rec.count = 0;
                rec.isSuccess = true;

                // updating the qrcode scan status on otp validation
                Qrcodescan.updateOne(data,{$set : rec}).then(record=> {
                    res.status(200).json({'msg':'Qrcode scanning completed successfully!','pending':false,'completed':true});
                }).catch(err=> {
                    res.status(500).send('Not able to save the qrcode!');
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