let mongoose=require('mongoose');

// Schema for barcode details collection
let barcodescanSchema = new mongoose.Schema({
    
    barcodeData: { 
        type: String, // barcode data
        default: ""
    },
    pending: {
        type: Boolean, // denotes whether barcode scanning is pending
        default: 0
    },
    completed: {
        type: Boolean, // denotes whether barcode scanning is completed
        default: 0
    },
    cancelled: {
        type: Boolean, // denotes whether barcode scanning is cancelled
        default: 0
    },
    isSuccess : {
        type: Boolean, // denotes whether verification using barcode is successful
        default: false
    },
    otp : {
        type: String, // otp sent during barcode scanning
        default: ""
    },
    count: {
        type: Number, // denotes the number of times of otp generation
        default: 1
    }
    
});

// Barcode Scan Model
module.exports = mongoose.model("Barcodescan",barcodescanSchema,"Barcodescan");

