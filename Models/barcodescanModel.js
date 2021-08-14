let mongoose=require('mongoose');

// Schema for barcode details collection
let barcodescanSchema = new mongoose.Schema({
    
    barcodeData: { 
        type: String, // barcode data
        default: ""
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

