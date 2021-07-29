
let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let Qrcodescan = require('../Models/qrcodescanModel');
let generateOTP = require('../OperationsModules/generateOTP');

router.get('/',(req,res)=> {
    res.status(200).send('Start scanning!');
});

router.get('/scan',(req,res)=> {

    res.status(200).send('qrcode scanning has started!');
});

router.post('/scan',bodyParser,(req,res)=> {

    let qrcodeData = req.body.qrcodeData;
    let otp = generateOTP();
    let qrcode = new Qrcodescan({
        qrcodeData,
        otp
    });
    let data = {qrcodeData};

    Qrcodescan.findOne(data).then((record)=> {

        if(record == null || record == undefined) {
            qrcode.save((err)=> {
                if(err) {
                    res.status(500).send('Not able to save the qrcode!');
                } else {
                    res.status(201).json({'otp':otp});
                }
            });
        } else {
            Qrcodescan.updateOne(data,{$set : {'otp':otp}}).then(record=> {
                res.status(201).json({'otp':otp});
            }).catch(err=> {
                res.status(500).send('Not able to save the barcode!');
            });
        }
    });

});

router.post('/validate',bodyParser,(req,res)=> {
    
    let qrcodeData = req.body.qrcodeData;
    let userOTP = req.body.otp;

    Qrcodescan.findOne({qrcodeData:qrcodeData}).then((record)=> {

        if(record == undefined || record == null) {
            res.status(500).send('qrcode Invalid! Please try again.');
        } else {
            if(record.otp == userOTP) {
                res.status(200).send('qrcode scanning completed successfully!');
            } else {
                res.status(404).send('Item not eligible for Pickup!');
            }
        }
    }).catch(err=> {
        res.status(500).json({'error':err});
    });
});

module.exports = router;