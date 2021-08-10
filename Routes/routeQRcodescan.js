
let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let Qrcodescan = require('../Models/qrcodescanModel');
let generateOTP = require('../OperationsModules/generateOTP');
let insertRecords = require('../OperationsModules/insertQrcode');

router.get('/',(req,res)=> {
    res.status(200).send('Start scanning!');
});

router.get('/scan',(req,res)=> {

    res.status(200).send('qrcode scanning has started!');
});

router.post('/scan',bodyParser,(req,res)=> {

    let qrcodeData = req.body.qrcodeData;
    let otp = generateOTP();
    let qrData = {
        qrcodeData,
        otp,
        pending: true,
        completed: false,
        cancelled: false
    };
    // let qrcode = new Qrcodescan(qrData);
    let data = {qrcodeData};

    Qrcodescan.findOne(data).then((record)=> {

        if(record == null || record == undefined) {
            // qrcode.save((err)=> {
            //     if(err) {
            //         res.status(500).send('Not able to save the qrcode!');
            //     } else {
            //         res.status(201).json({'otp':otp,'pending':true,'completed':false});
            //     }
            // });
            insertRecords(qrData);
        } else {

            record.count++; 
            console.log(record);

            if(record.count > 3) {
                res.status(500).send('OTP generation limit exceeded! Try again after 24 hours.');
            } else {

                qrData.count = record.count;

                Qrcodescan.updateOne(data,{$set : qrData}).then(record=> {
                    res.status(201).json({'otp':otp,'pending':true,'completed':false});
                }).catch(err=> {
                    res.status(500).send('Not able to save the qrcode!');
                });
            }
            
        }
    });

});

router.post('/validate',bodyParser,(req,res)=> {
    
    let qrcodeData = req.body.qrcodeData;
    let userOTP = req.body.otp;
    let data = {qrcodeData};

    Qrcodescan.findOne({qrcodeData:qrcodeData}).then((rec)=> {

        if(rec == undefined || rec == null) {
            res.status(500).send('qrcode Invalid! Please try again.');
        } else {
            if(rec.otp == userOTP) {

                rec.completed = true;
                rec.pending = false;
                rec.count = 0;
                rec.isSuccess = true;

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