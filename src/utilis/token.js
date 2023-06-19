const jwt = require('jsonwebtoken');
require('dotenv').config();


const tokenGenerator = async(data) => {
    let token = jwt.sign(data, process.env.SECRET);
    return token;
};

//test a token is legit and not tampered with
function tokenVerifier(token) {
    return jwt.verify(token, process.env.SECRET), { expiresIn: '5s' };
}

//token when they login, protected routes e.g getAllBooks if logged in
module.exports = {
    tokenGenerator,
    tokenVerifier
};