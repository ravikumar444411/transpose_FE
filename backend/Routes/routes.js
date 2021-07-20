let bcrypt = require('bcrypt');
let express = require('express');
let async = require('async');
let session = require('express-session');
let router = express.Router();
let User = require('../Models/UserModel');
let insertRecords = require('../OperationsModules/insert');
let generateAccessToken = require('../OperationsModules/generateAccessToken');

router.get('/',async(req,res)=> {

    console.log(req.session.user_id);

    if(req.session.user_id != null) {
        console.log('Already logged in');
        let record = await User.findOne({_id : req.session.user_id}).lean().sort({incr : -1}).catch(error => {
            console.log(error);
        });
        res.render('home',{record : record, empid: req.session.user_id});
    } else {
        console.log('Not logged in yet');
        res.render('home',{empid: null});
    }
});

router.get('/signup',(req,res)=> {
    res.render('signup');
}); 

router.post('/signup',async(req,res)=> {

    let fname = req.body.fname;
    let lname = req.body.lname;
    let username = req.body.username;
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
        fname,
        lname,
        username: username,
        email,
        password: JSON.stringify(hash)
    };
    
    insertRecords(details);
    console.log('signup successful!');
    // console.log('Username assigned to you is',details.username);

    res.redirect('/');
}); 

router.get('/login',(req,res)=> {
    res.render('login');
}); 

router.post('/login',async(req,res)=> {
    let username = req.body.username;
    let password = req.body.password;
    let searchRecord = {
        username,
        password
    };

    let record = await User.find(searchRecord).sort({username:1}).limit(1).catch((err)=> {
        console.log(err);
    });

    if(record == undefined) {
        console.log('Username not found!');
        res.redirect('/login');

    } else {

        console.log(password,record.password);
        let check = bcrypt.compare(password,record.password).catch((err)=> {
            console.log("password authentication : ",err);
        });

        if(check == false) {
            console.log('Password incorrect!');
            res.redirect('/login');
        }

        console.log('Login successful!');
        req.session.user_id = record._id;
        console.log(req.session.user_id);

        const token = generateAccessToken(searchRecord);
        res.json(token);
        // res.redirect('/');
    }
}); 

module.exports = router;