

function generateOTP() {
    let otp = Math.floor(Math.random()*999999 + 1);
    let OTP = otp.toString();
    let temp = "";

    for(let i=0;i<(6-OTP.length);i++) {
        temp += "0";
    }

    let completeOtp = temp + OTP;
    console.log(completeOtp);

    return completeOtp;
}

module.exports = generateOTP;