let bcrypt = require('bcrypt');
let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let dbConnect = require('../DB-Connect/connect-db');
let User = require('../Models/authModel');
let postAuth = require('../Kafka/producer');
let generateAccessToken = require('../OperationsModules/generateAccessToken');

// GET request on '/auth' route
router.get('/',(req,res)=> {
    res.status(200).send('Welcome to API Operations!');
});

// GET request on '/auth/signup' route
router.get('/signup',(req,res)=> {
    res.status(200).send('Signup!');
}); 

// POST request on '/auth/signup' route
router.post('/signup',bodyParser,async(req,res)=> {

    let email = req.body.email;
    let password = req.body.password;
    
    let records = User.find({}).catch(err=>{
        console.log(err);
    });

    // number of salt rounds
    let saltRounds = 10;

    // generating salt for password encrpytion
    let salt = await bcrypt.genSalt(saltRounds).catch(err=> {
        console.log('salt-error : ', err);
    });

    // generating hash and concatenating salt with hash
    // for password encryption
    let hash = await bcrypt.hash(password,salt).catch(err=> {
        console.log('hash-error : ', err);
    });

    let details = {
        email,
        password: hash
    };

    let user = new User(details);
    // checking whether all the required fields of the collection are included or not
    let err = user.validateSync();

    if(err == undefined) {
        // insert record into the database if not already present
        postAuth(details,"Test-Topics");
        console.log('signup successful!');
        res.status(201).send('signup successful!');
    } else {
        // send error if all the compulsory fields are not covered
        res.status(500).json({'msg':'All required fields not covered'});
    }
    
}); 

// GET request on '/auth/login' route
router.get('/login',(req,res)=> {
    res.status(200).send('Login please!');
}); 

// POST request on '/auth/login' route
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

    // checking whether record with given email
    // is present in the database or not
    if(record == undefined) {
        res.status(401).send('Email not found!');
    } else {
        console.log(record);

        // matching the input password and the actual password
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

                    // on successful login, generate and send access (jwt) token 
                    const token = generateAccessToken(searchRecord);
                    res.status(201).send({"key":token});
                    
                }
            }
        });
    }
}); 

module.exports = router;