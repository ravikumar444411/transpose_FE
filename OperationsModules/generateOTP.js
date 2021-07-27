

function generateOTP() {
    let otp = Math.floor(Math.random()%1e7);
    otp = otp.toString();
    let temp = "";

    for(let i=0;i<otp.length;i++) {
        temp += "0";
    }

    let completeOtp = temp + otp;

    return completeOtp;
}

module.exports = generateOTP;