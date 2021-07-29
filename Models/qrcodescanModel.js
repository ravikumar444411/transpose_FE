let mongoose=require('mongoose');

let qrcodescanSchema = new mongoose.Schema({
    
    qrcodeData: {
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
    },
    otp : {
        type: String,
        default: ""
    }
    
});

// let productSchema = new mongoose.Schema({

//     pid: {
//         type: String,
//         default: ""
//     },
//     barcodeStatus: {
//         type: [barcodescanSchema],
//         default: {}
//     }
// });

module.exports = mongoose.model("Qrcodescan",qrcodescanSchema,"Qrcodescan");
