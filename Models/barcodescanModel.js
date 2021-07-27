let mongoose=require('mongoose');

let barcodescanSchema = new mongoose.Schema({
    
    barcodeData: {
        type: String,
        default: ""
    },
    pending: {
        type: Number,
        default: 0
    },
    completed: {
        type: Number,
        default: 0
    },
    cancelled: {
        type: Number,
        default: 0
    },
    isSuccess : {
        type: Boolean,
        default: false
    }
    
});

module.exports = mongoose.model("Barcodescan",barcodescanSchema,"Barcodescan");

