
let jwt = require('jsonwebtoken');

function generateAccessToken(details) {
    return jwt.sign(details, process.env.TOKEN_SECRET, { expiresIn: '900s' });
}

module.exports = generateAccessToken;