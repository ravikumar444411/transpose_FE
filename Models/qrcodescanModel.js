let mongoose=require('mongoose');

// Schema for qrcode details collection
let qrcodescanSchema = new mongoose.Schema({
    
    qrcodeData: { 
        type: String, // qrcode data
        default: ""
    },
    pending: {
        type: Boolean, // denotes whether qrcode scanning is pending
        default: 0
    },
    completed: {
        type: Boolean, // denotes whether qrcode scanning is completed
        default: 0
    },
    cancelled: {
        type: Boolean, // denotes whether qrcode scanning is cancelled
        default: 0
    },
    isSuccess : {
        type: Boolean, // denotes whether verification using qrcode is successful
        default: false
    },
    otp : {
        type: String, // otp sent during qrcode scanning
        default: ""
    },
    count: {
        type: Number, // denotes the number of times of otp generation
        default: 1
    }
    
});

// QRcode Scan Model
module.exports = mongoose.model("Qrcodescan",qrcodescanSchema,"Qrcodescan");

