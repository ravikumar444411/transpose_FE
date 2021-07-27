
let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let Barcodescan = require('../Models/BarcodescanModel');
let generateOTP = require('../OperationsModules/generateOTP');

router.get('/scan',(req,res)=> {
    res.status(200).send('Barcode scanning has started!');
});

router.post('/scan',(req,res)=> {

    let otp = generateOTP();

    res.status(201).json({'otp':otp});
});

// router.post('/validate',(req,res)=> {
    
    
// });

module.exports = router;