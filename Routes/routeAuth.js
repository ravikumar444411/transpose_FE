let bcrypt = require('bcrypt');
let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let User = require('../Models/authModel');
let insertRecords = require('../OperationsModules/insertAuth');
let generateAccessToken = require('../OperationsModules/generateAccessToken');

router.get('/',(req,res)=> {
    res.status(200).send('Welcome to API Operations!');
});

router.get('/signup',(req,res)=> {
    res.status(200).send('Signup!');
}); 

router.post('/signup',bodyParser,async(req,res)=> {

    let email = req.body.email;
    let password = req.body.password;
    
    let records = User.find({}).catch(err=>{
        console.log(err);
    });

    let saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds).catch(err=> {
        console.log('salt-error : ', err);
    });
    let hash = await bcrypt.hash(password,salt).catch(err=> {
        console.log('hash-error : ', err);
    });;

    let details = {
        email,
        password: hash
    };
    
    insertRecords(req,res,details);
    console.log('signup successful!');
}); 

router.get('/login',(req,res)=> {
    res.status(200).send('Login please!');
}); 

router.post('/login',bodyParser,async(req,res)=> {

    let email = req.body.email;
    let password = req.body.password;
    
        
    let searchRecord = {
        email: email,
        password: password
    };

    let record = await User.findOne({email:email}).catch((err)=> {
        console.log(err);
    });

    if(record == undefined) {
        res.status(401).send('Email not found!');
    } else {
        console.log(record);

        bcrypt.compare(password,record.password,(err,check)=> {
            if(err) {
                console.log(err);
            } else {
                console.log(password, record.password);
                console.log(check);

                if(check == false) {
                    res.status(401).send('Unauthorized access');
                } else {
                    console.log('Login successful!');

                    const token = generateAccessToken(searchRecord);
                    res.status(201).send({"key":token});
                    
                }
            }
        });
    }
}); 

module.exports = router;