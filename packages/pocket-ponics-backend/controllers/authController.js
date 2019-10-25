const bcrypt = require('bcrypt');
const crypto = require('crypto');
import mySQL from '../models/mySQLModel';

//Get an authentication token for given user credentials
exports.getToken = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store email and password provided
    var email = credentials[0];
    var password = credentials[1];

    //Retrieve password hash from database for given email
    mySQL.getHashForUser(email, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
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
                    var token = crypto.randomBytes(32).toString('base64')
                    
                    //Store token in DB
                    mySQL.insertTokenForUser(token, record.user_id, mySQL.getExpirationDateString(), (err, result) => {
                        if(!err)
                        {
                            res.json({token: token})
                            console.log("Insert operation successful")
                        } 
                        else 
                        {
                            res.json({403: "Error generating token"})
                            console.log("Unable to insert token in db")
                        }
                    })
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};

//TODO: Send a reset password command to backend
exports.resetPassword = (req, res) => {
    var username = req.body.username
    
    //NOTE: REVOKE TOKENS FOR USER_ID!

    res.json({200: "RESET PASSWORD"})
};

//Create a user with provided email and password
exports.createUser = (req, res) => {
    //Store email and password provided
    var password = req.body.password;
    var email = req.body.email;
    
    //Retrieve email from database
    mySQL.getHashForUser(email, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {    
            //Calculate hash for provided password
            var password_hash = bcrypt.hashSync(password, 10)

            //If email doesn't exist, create user in DB with email and password hash
            mySQL.createUser(email, password_hash, (err, result) => {
                if(!err)
                {
                    res.json({200: "User Created"})
                    console.log("Insert operation successful")
                } 
                else 
                {
                    res.json({201: "Unable to create user"})
                    console.log("Unable to insert user in db")
                }
            })
        }
        else 
        {
            res.json({202: "User Already Exists"})
        }
    })
};

//Change the user's password
exports.changePassword = (req, res) => {
    //Store email, old password and new password provided
    var email = req.body.email;
    var oldPassword = req.body.old_password;
    var newPassword = req.body.new_password;
    
    //Retrieve password hash from DB for provided email
    mySQL.getHashForUser(email, function(err, record) {
        if(err)
        {
            res.json({403:"Authentication Error"})
        }
        else if(record == undefined)
        {
            res.json({402: "User Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(oldPassword, record.password_hash, (err, result) => {
                if(result)
                {
                    //Calculate new password hash and store in DB
                    var newPasswordHash = bcrypt.hashSync(newPassword, 10);
                    mySQL.updateUserHash(record.user_id, newPasswordHash, function(err, result) {
                        if(!err)
                        {
                            console.log("Update operation successful")
                            
                            //Revoke tokens for user's old active sessions
                            mySQL.revokeTokens(record.user_id, function(err, result) {
                                if(!err)
                                {
                                    console.log("Tokens revoked successfully")
                                    res.json({200: "User Password Changed"})
                                }
                                else
                                {
                                    res.json({201: "Unable to change user password"})
                                    console.log("Unable to delete record in db")
                                }
                            })
                        } 
                        else 
                        {
                            res.json({201: "Unable to change user password"})
                            console.log("Unable to update record in db")
                        }
                    })
                    
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};