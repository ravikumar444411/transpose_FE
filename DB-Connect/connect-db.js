let MongoStore = require('connect-mongo');
let mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET || 'betterkeepitasasecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24*3600
});

store.on('error',(e) => {
    console.log('Error while connecting to mongo :',e);
});

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((data)=>{
    //  console.log(data);
}).catch((err)=>{
    console.log(err);
});

var conn = mongoose.connection;

conn.on('connected', function() {
    console.log('database is connected successfully');
});

conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

conn.on('error', console.error.bind(console, 'connection error:'));


module.exports = {store,secret,conn};