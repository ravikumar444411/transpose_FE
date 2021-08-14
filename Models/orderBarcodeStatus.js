let mongoose=require('mongoose');

// Schema for order status collection
let OrderstatusSchema = new mongoose.Schema({
    
    pending: {
        type: Number, // denotes number of pending orders
        default: 0
    },
    completed: {
        type: Number, // denotes number of completed orders
        default: 0
    },
    cancelled: {
        type: Number, // denotes number of cancelled orders
        default: 0
    }
    
});

// order status Model
let Orderstatus = mongoose.model("Orderstatus",OrderstatusSchema,"Orderstatus");

module.exports = Orderstatus;
