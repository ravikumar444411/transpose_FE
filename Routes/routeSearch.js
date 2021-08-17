let express = require('express');
let async = require('async');
let bodyParser = require('body-parser').json();
let router = express.Router();
let Trie = require('trie-prefix-tree');
let Sellers = require('../Models/sellersModel');

router.get('/',(req,res)=> {

    res.send('Pass a parameter string to start searching!');
});

router.get('/:searchString',bodyParser,(req,res)=> {
   
    let searchString = req.params.searchString;
    console.log(searchString);
    
    Sellers.find({'seller':{ "$regex": searchString, "$options": "i" }}).then(records=> {
        // console.log(records);
        res.status(201).send(records);
    }).catch(err=> {
        console.log(err);
        res.status(500).send('Internal server errors!');
    });
});

module.exports = router;