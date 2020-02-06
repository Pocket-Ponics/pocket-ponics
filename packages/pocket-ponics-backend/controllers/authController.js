const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const validator = require('email-validator');
const nodemailer = require("nodemailer");
const passwordValidator = require('password-validator');
import mySQL from './mySQLController';

// Create a schema for password validation
var passVal = new passwordValidator();
passVal.is().min(8).is().max(100).has().not().spaces()

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
            res.status(403)
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.status(402)
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
                            res.status(200)
                            res.json({token: token})
                        } 
                        else 
                        {
                            res.status(403)
                            res.json({403: "Error generating token", error: record.sqlMessage})
                        }
                    })
                }
                else {
                    res.status(401)
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })

};

exports.getTokenForAdmin = (req, res) => {

    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store email and password provided
    var email = credentials[0];
    var password = credentials[1];

    //Retrieve password hash from database for given email
    mySQL.getHashForAdminUser(email, function(err, record) {
        if(err)
        {
            console.log(err)
            res.status(403)
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.status(402)
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
                            res.status(200)
                            res.json({token: token})
                        } 
                        else 
                        {
                            res.status(403)
                            res.json({403: "Error generating token", error: record.sqlMessage})
                        }
                    })
                }
                else {
                    console.log(err)
                    res.status(401)
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
}

//Send a reset password command to backend
exports.resetPassword = (req, res) => {
    var email = req.body.email

    if(!validator.validate(email))
    {
        res.status(210)
        res.json({210: "Error: Invalid Email"})
    }
    else
    {
        //Generate new password
        var newPassword = Math.random().toString(36).slice(-8);

        mySQL.getUserIDForUser(email, function(err, record) {
            if(!err)
            {
                var salt = bcrypt.genSaltSync(10);
                var newPasswordHash = bcrypt.hashSync(newPassword, salt);
                mySQL.updateUserHash(record.user_id, newPasswordHash, function(err, result) {
                    if(!err)
                    {                    
                        let transporter = nodemailer.createTransport({
                            host: "smtp.mail.com",
                            port: 587,
                            secure: false, 
                            auth: {
                            user: 'pocketponics@mail.com', 
                            pass: 'P0ckEtPon1Cs!' 
                            }
                        });
                        
                        // Send email
                        var mailSettings = {
                            from: '"Pocket Ponics" <pocketponics@mail.com>', 
                            to: email, 
                            subject: "Your New Password",
                            text: `Your new password is ${newPassword}`
                        }
                        
                        transporter.sendMail(mailSettings, function(err, info) {
                            if (err) 
                            {
                                console.log(err);
                            } 
                            else 
                            {
                                //Revoke tokens for user's old active sessions and device keys for notifications
                                mySQL.revokeTokensAndDeviceKeys(record.user_id, function(err, result) {
                                    if(!err)
                                    {
                                        res.status(200)
                                        res.json({200: "User Password Reset"})
                                    }
                                    else
                                    {
                                        res.status(201)
                                        res.json({201: "Unable to reset user password", error: record.sqlMessage})
                                    }
                                })
                            }}); 
                    } 
                    else 
                    {
                        res.status(201)
                        res.json({201: "Unable to reset user password"})
                    }
                })
            }
        })
    }
};

//Create a user with provided email and password
exports.createUser = (req, res) => {
    //Store email and password provided
    var password = req.body.password;
    var email = req.body.email;
    
    //Validate username and password provided
    if(validator.validate(email) && passVal.validate(password))
    {
        //Retrieve email from database
        mySQL.getHashForUser(email, function(err, record) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(record == undefined)
            {    
                //Calculate hash for provided password
                var salt = bcrypt.genSaltSync(10);
                var password_hash = bcrypt.hashSync(password, salt)
    
                //If email doesn't exist, create user in DB with email and password hash
                mySQL.createUser(email, password_hash, (err, result) => {
                    if(!err)
                    {
                        res.status(200)
                        res.json({200: "User Created"})
                    } 
                    else 
                    {
                        res.status(201)
                        res.json({201: "Unable to create user", error: record.sqlMessage})
                    }
                })
            }
            else 
            {
                res.status(202)
                res.json({202: "User Already Exists"})
            }
        })
    }
    else
    {
        res.status(203)
        res.json({203: "Invalid Username/Password Provided"})
    }
};

//Change the user's password
exports.changePassword = (req, res) => {
    //Store email, old password and new password provided
    var email = req.body.email;
    var oldPassword = req.body.old_password;
    var newPassword = req.body.new_password;
    
    if(passVal.validate(newPassword) && validator.validate(email))
    {
        //Retrieve password hash from DB for provided email
        mySQL.getHashForUser(email, function(err, record) {
            if(err)
            {
                res.status(403)
                res.json({403:"Authentication Error"})
            }
            else if(record == undefined)
            {
                res.status(402)
                res.json({402: "User Not Found"})
            } 
            else 
            {
                //Calculate password hash and compare to retrieved hash
                bcrypt.compare(oldPassword, record.password_hash, (err, result) => {
                    if(result)
                    {
                        //Calculate new password hash and store in DB
                        var salt = bcrypt.genSaltSync(10);
                        var newPasswordHash = bcrypt.hashSync(newPassword, salt);
                        mySQL.updateUserHash(record.user_id, newPasswordHash, function(err, result) {
                            if(!err)
                            {                                
                                //Revoke tokens for user's old active sessions and device keys for notifications
                                mySQL.revokeTokensAndDeviceKeys(record.user_id, function(err, result) {
                                    if(!err)
                                    {
                                        res.status(200)
                                        res.json({200: "User Password Changed"})
                                    }
                                    else
                                    {
                                        res.status(201)
                                        res.json({201: "Unable to change user password"})
                                    }
                                })
                            } 
                            else 
                            {
                                res.status(201)
                                res.json({201: "Unable to change user password", error: record.sqlMessage})
                            }
                        })
                        
                    }
                    else {
                        res.status(401)
                        res.json({401: "Unauthorized"})
                    }        
                })
            }
        })
    }
    else
    {
        res.status(202)
        res.json({202: "Invalid Email/New Password Provided"})
    }
};