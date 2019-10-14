const bcrypt = require('bcrypt');

//Get an authentication token for given user credentials
exports.getToken = (req, res) => {
    //convert base64 credentials to ascii
    let cred = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(cred, 'base64');
    let text = buff.toString('ascii');
    
    //calculate hash for provided password
    var result = bcrypt.hashSync(text.split(":")[1], 10);
    
    res.json({token: "d93nlHS134nHWSOOEW"})
};

//Send a reset password command to backend
exports.resetPassword = (req, res) => {
    //provided values
    console.log(req.body)

    res.json({200: "OK"})
};

//Create a user with provided username and password
exports.createUser = (req, res) => {
    //provided values
    console.log(req.body)

    res.json({200: "OK"})
};

//Change the user's password
exports.changePassword = (req, res) => {
    //provided values
    console.log(req.body)

    res.json({200: "OK"})
};