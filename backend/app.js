if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let nodemon = require('nodemon');
let session = require('express-session');
// var Keycloak = require('keycloak-connect');
let MongoStore = require('connect-mongo');
let router = require('./Routes/routes');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

const dbUrl = process.env.DBURL || 'mongodb://localhost:27017/myFirstDatabase';
const secret = process.env.SECRET || 'betterkeepitasasecret';
let port = process.env.PORT || 3000;
app.set("port",port);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24*3600
});

store.on('error',(e) => {
    console.log('Error while connecting to mongo :',e);
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUnitialized: true
};

app.use(session(sessionConfig));

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use('/',router);


port = Math.floor(Math.random()*8976+1024);

app.listen(3000,()=> {
    console.log("The server is connected to",`${3000}`);
});
