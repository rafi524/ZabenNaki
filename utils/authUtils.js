// libraries
const jwt = require('jsonwebtoken');

// my modules
const dbAuthuth = require('../db/dbAuth.js');

// function to login user into a session
async function userLogin(res, ID){
    // create token
    const payload = {
        id: ID
    };
    let token = jwt.sign(payload, process.env.APP_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 90000000, 
        httpOnly: true
    }
    res.cookie('sessionToken', token, options);
}

async function loginAdmin(res, ID){
    // create token
    const payload = {
        id: ID
    };
    let token = jwt.sign(payload, process.env.APP_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 90000000,
        httpOnly: true
    }
    res.cookie('adminSessionToken', token, options);
}

module.exports = {
    userLogin
    
}