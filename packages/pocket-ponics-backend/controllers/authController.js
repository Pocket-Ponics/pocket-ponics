//Get an authentication token for given user credentials
exports.getToken = (req, res) => {
    //convert base64 credentials to ascii
    let cred = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(cred, 'base64');
    let text = buff.toString('ascii');
    console.log(text)

    res.json({token: "d93nlHS134nHWSOOEW"})
};

//Send a reset password command to backend
exports.resetPassword = (req, res) => {
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