
//Post all sensor readings for all levels of greenhouse
exports.postReadingsGreenhouse = (req, res) => {

    //convert base64 credentials to ascii
    let cred = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(cred, 'base64');
    let text = buff.toString('ascii');
    console.log(text)

    //sensor readings
    console.log(req.body)

    res.json({
        test: "test"
    })
};

//Post the all the sensor readings for a specific level
exports.postReadingsLevel = (req, res) => {

    //convert base64 credentials to ascii
    let cred = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(cred, 'base64');
    let text = buff.toString('ascii');
    console.log(text)

    //get parameters passed through url
    console.log(req.params)

    //sensor readings
    console.log(req.body)

    res.json({
        test: "test"
    })
};

//Post a reading for a single sensor
exports.postReadingsSingle = (req, res) => {

    //convert base64 credentials to ascii
    let cred = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(cred, 'base64');
    let text = buff.toString('ascii');
    console.log(text)

    //get parameters passed through url
    console.log(req.params)

    //sensor readings
    console.log(req.body)

    res.json({
        test: "test"
    })
};

//Update the greenhouse's current power source
exports.updatePowerSource = (req, res) => {

    //convert base64 credentials to ascii
    let cred = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(cred, 'base64');
    let text = buff.toString('ascii');
    console.log(text)

    //sensor readings
    console.log(req.body)

    res.json({
        test: "test"
    })
};

//Update the current backup battery level
exports.updateBackupBatteryLevel = (req, res) => {

    //convert base64 credentials to ascii
    let cred = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(cred, 'base64');
    let text = buff.toString('ascii');
    console.log(text)

    //sensor readings
    console.log(req.body)

    res.json({
        test: "test"
    })
};

//Get any pending adjustment commands from backend
exports.getAdjustments = (req, res) => {

    //convert base64 credentials to ascii
    let cred = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(cred, 'base64');
    let text = buff.toString('ascii');
    console.log(text)

    res.json({
        test: []
    })
};