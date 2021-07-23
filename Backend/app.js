if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

let express = require('express');
let app = express();
let nodemon = require('nodemon');
let session = require('express-session');
let cors=require("cors");
let routeLogin = require('./Routes/routeAuth');
let routeDelivery = require('./Routes/routeDelivery');
let routeHandover = require('./Routes/routeHandover');
let routeMenu = require('./Routes/routeMenu');
let routePickup = require('./Routes/routePickUp');
let sessionConfig = require('./DB-Connect/connect-db');
let port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.set("port",port);
app.use(session(sessionConfig));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/auth',routeLogin);
app.use('/delivery',routeDelivery);
app.use('/handover',routeHandover);
app.use('/pickup',routePickup);

// port = Math.floor(Math.random()*8976+1024);
app.listen(port,()=> {
    console.log("The server is connected to 3000");
});
