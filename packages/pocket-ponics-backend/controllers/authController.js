const bcrypt = require('bcrypt');
const crypto = require('crypto');
import mySQL from '../models/mySQLModel';

//Get an authentication token for given user credentials
exports.getToken = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var username = credentials[0];
    var password = credentials[1];

    //Retrieve password hash from database for given username
    mySQL.getHashForUser(username, function(record) {
        if(record == undefined)
        {
            res.json({402: "User Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(password, record.password_hash, (err, result) => {
                if(result)
                {
                    //Calculate token, store in DB and return as response
                    var token = crypto.randomBytes(32).toString('ascii')
                    
                    //Store token in DB
                    mySQL.insertTokenForUser(token, record.user_id, mySQL.getExpirationDateString(), (err, result) => {
                        if(!err)
                        {
                            console.log("Insert operation successful")
                        } 
                        else 
                        {
                            console.log("Unable to insert token in db")
                        }
                    })
                    res.json({token: token})
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};

//Send a reset password command to backend
exports.resetPassword = (req, res) => {
    var username = req.body.username
    
    //NOTE: REVOKE TOKENS FOR USER_ID!

    res.json({200: "RESET PASSWORD"})
};

//Create a user with provided username and password
exports.createUser = (req, res) => {
    //Store username, email and password provided
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    
    //Retrieve username from database
    //TODO: retrieve username from DB

    //Calculate hash for provided password
    var passwordHash = bcrypt.hashSync(password, 10);

    //If username doesn't exist, create user in DB with username, password hash and email

    res.json({200: "USER CREATED"})
};

//Change the user's password
exports.changePassword = (req, res) => {
    //Store username, old password and new password provided
    var username = req.body.username;
    var oldPassword = req.body.old_password;
    var newPassword = req.body.new_password;
    
    //Retrieve password hash from DB for provided username
    //TODO: retrieve hash from DB

    //Calculate hash for provided password
    var passwordHash = bcrypt.hashSync(oldPassword, 10);

    //Compare calculated hash to retrieved hash
    //TODO: compare calculated hash to retrieved hash

    //If retrieved password hash matches calculated hash, generate new hash and store in DB
    //TODO: compare hashes
    var newPasswordHash = bcrypt.hashSync(newPassword, 10);
    //TODO: store new hash in DB

    //NOTE: REVOKE TOKENS FOR USER_ID!

    res.json({200: "PASSWORD CHANGED"})
};