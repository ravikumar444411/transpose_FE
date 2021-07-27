

function generateOTP() {
    let otp = Math.floor(Math.random()%1e7);
    let completeOtp = (otp.toString().padStart(6-otp.length,"0"));

    return completeOtp;
}

module.exports = generateOTP;