

function generateOTP() {
    let otp = Math.floor(Math.random()*1e6);
    let oneTime = otp.toString();
    let OTP = oneTime.padStart(6-oneTime.length,"0");
    console.log(otp);

    return OTP;
}

module.exports = generateOTP;