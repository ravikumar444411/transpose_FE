

function generateOTP() {
    let otp = Math.floor(Math.random()*10000000);
    // let OTP = otp.toString();
    // let temp = "";

    // for(let i=0;i<(6-OTP.length);i++) {
    //     temp += "0";
    // }

    // let completeOtp = temp + OTP;
    // console.log(completeOtp);

    // return completeOtp;
    return otp;
}

module.exports = generateOTP;