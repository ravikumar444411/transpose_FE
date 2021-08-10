
let jwt = require('jsonwebtoken');

// function generates random jwt token for authentication 
function generateAccessToken(details) {
    return jwt.sign(details, process.env.TOKEN_SECRET, { expiresIn: '900s' });
}

module.exports = generateAccessToken;