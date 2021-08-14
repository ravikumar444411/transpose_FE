let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let Barcodescan = require('../Models/barcodescanModel');
let Orderstatus = require('../Models/orderBarcodeStatus');
let generateOTP = require('../OperationsModules/generateOTP');
let postBarcode = require('../Kafka/producer');
const { compareSync } = require('bcrypt');

// GET request on '/barcode' route
router.get('/',(req,res)=> {
    res.status(200).send('Start scanning!');
});

// GET request on '/barcode/scan' route
router.get('/scan',async(req,res)=> {
    let orderstatusrecord = await Orderstatus.find({}).sort({_id:1}).limit(1);
    
    res.status(201).send({pending:orderstatusrecord[0].pending,completed:orderstatusrecord[0].completed,cancelled:orderstatusrecord[0].cancelled});
});

// POST request on '/barcode/scan' route
router.post('/scan',bodyParser,async(req,res)=> {

    let barcodeData = req.body.barcodeData;

    // generate OTP on barcode scan
    let otp = generateOTP();
    let barData = {
        barcodeData,
        otp
    };
    
    let data = {barcodeData};
    let orderstatusrecord = await Orderstatus.find({}).catch(err=> {
        console.log(err);
    });

    console.log(orderstatusrecord);

    // checking whether a record with same barcode number exists or not
    Barcodescan.findOne(data).then(async(record)=> {

        if(record == null || record == undefined) {
            
            let barcode = new Barcodescan(barData);
            // checking whether all the required fields of the collection are included or not
            let err = barcode.validateSync();

            if(err == undefined) {
                // insert record into the database if not already present
                postBarcode(barData,"Test-Topics1");
                orderstatusrecord[0].pending++;
                
                // updating status of orders
                Orderstatus.update({},{$set : orderstatusrecord[0]}).then((status)=> {
                    console.log(status);
                }).catch((err)=> {
                    console.log(err);
                });

                res.status(201).json({'otp':otp,pending:orderstatusrecord[0].pending,completed:orderstatusrecord[0].completed,cancelled:orderstatusrecord[0].cancelled});
            } else {
                // send error if all the compulsory fields are not covered
                res.status(500).json({'msg':'All required fields not covered'});
            }
            
        } else {
            
            // increment the count of otp generation for above barcode no.
            record.count++; 
            console.log(record);

            if(record.count > 5) {  
                // send status 500 for exceeding the otp generation limit
                orderstatusrecord[0].cancelled++;
                orderstatusrecord[0].pending--;

                // updating status of orders
                Orderstatus.update({},{$set : orderstatusrecord[0]}).then((status)=> {
                    console.log(status);
                }).catch((err)=> {
                    console.log(err);
                });

                Barcodescan.deleteOne({barcodeData : barcodeData}).then(response=> {
                    console.log(response);
                }).catch(err=> {
                    console.log(err);
                });

                res.status(500).json({'msg':'OTP generation limit exceeded! Try again after 24 hours.',pending:orderstatusrecord[0].pending,completed:orderstatusrecord[0].completed,cancelled:orderstatusrecord[0].cancelled});
            } else {

                barData.count = record.count;

                // update the already existing record with otp and barcode scan status
                Barcodescan.updateOne(data,{$set : barData}).then(record=> {
                    res.status(201).json({otp:otp,pending:orderstatusrecord[0].pending,completed:orderstatusrecord[0].completed,cancelled:orderstatusrecord[0].cancelled});
                }).catch(err=> {
                    res.status(500).send('Not able to save the barcode!');
                });
            }
        }
    });

});

// POST request on '/barcode/validate' route
router.post('/validate',bodyParser,async(req,res)=> {
    
    let barcodeData = req.body.barcodeData;
    let userOTP = req.body.otp;
    let data = {barcodeData};
    let orderstatusrecord = await Orderstatus.find({}).sort({_id:1}).limit(1);

    // find the record with above barcode number
    Barcodescan.findOne({barcodeData: barcodeData}).then((rec)=> {

        if(rec == undefined || rec == null) {
            // send status 500 if barcode number does not exist
            res.status(500).send('Barcode Invalid! Please try again.');
        } else {

            // matching the input otp and actual otp
            if(rec.otp == userOTP) {

                orderstatusrecord[0].pending--;
                orderstatusrecord[0].completed++;

                // updating status of orders
                Orderstatus.update({},{$set : orderstatusrecord[0]}).then((status)=> {
                    console.log(status);
                }).catch((err)=> {
                    console.log(err);
                });

                // updating the barcode scan status on otp validation
                Barcodescan.updateOne(data,{$set : rec}).then(record=> {
                    res.status(200).json({'msg':'Barcode scanning completed successfully!',pending:orderstatusrecord[0].pending,completed:orderstatusrecord[0].completed,cancelled:orderstatusrecord[0].cancelled});
                }).catch(err=> {
                    res.status(500).send('Not able to save the barcode!');
                });
            } else {
                // invalid otp
                res.status(404).send('Item not eligible for Pickup!');
            }
        }

    }).catch(err=> {
        console.log(err);
        res.status(500).json({'error':err});
    });
});

module.exports = router;