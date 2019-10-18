const bcrypt = require('bcrypt');

//Post all sensor readings for all tiers of greenhouse
exports.postReadingsGreenhouse = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];
    
    //Retrieve password hash from database for given serial_number
    //TODO: retrieve hash from DB

    //Calculate hash for provided password
    var passwordHash = bcrypt.hashSync(password, 10);

    //Compare calculated hash to retrieved hash
    //TODO: compare calculated hash to retrieved hash

    //Retrieve user_id and greenhouse_id for given serial_number
    //TODO: query DB

    //Store readings in DB
    //TODO: insert into DB

    res.json( {200: "OK"})
};

//Post the all the sensor readings for a specific tier
exports.postReadingsTier = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];
    
    //Retrieve password hash from database for given serial_number
    //TODO: retrieve hash from DB

    //Calculate hash for provided password
    var passwordHash = bcrypt.hashSync(password, 10);

    //Compare calculated hash to retrieved hash
    //TODO: compare calculated hash to retrieved hash

    //Retrieve user_id and greenhouse_id for given serial_number
    //TODO: query DB

    //Store readings in DB
    //TODO: insert into DB

    res.json( {200: "OK"})
};

//Post a reading for a single sensor
exports.postReadingsSingle = (req, res) => {
   //convert base64 credentials to ascii
   let basicAuth = req.headers.authorization.split(" ")[1]
   let buff = new Buffer(basicAuth, 'base64');
   let credentials = buff.toString('ascii').split(":");

   //Store username and password provided
   var serial_no = credentials[0];
   var password = credentials[1];
   
   //Retrieve password hash from database for given serial_number
   //TODO: retrieve hash from DB

   //Calculate hash for provided password
   var passwordHash = bcrypt.hashSync(password, 10);

   //Compare calculated hash to retrieved hash
   //TODO: compare calculated hash to retrieved hash

   //Retrieve user_id and greenhouse_id for given serial_number
   //TODO: query DB

   //Store readings in DB
   //TODO: insert into DB

    res.json( {200: "OK"})
};

//Update the greenhouse's current power source
exports.updatePowerSource = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];
    
    //Retrieve password hash from database for given serial_number
    //TODO: retrieve hash from DB

    //Calculate hash for provided password
    var passwordHash = bcrypt.hashSync(password, 10);

    //Compare calculated hash to retrieved hash
    //TODO: compare calculated hash to retrieved hash

    //Retrieve user_id and greenhouse_id for given serial_number
    //TODO: query DB

    //Store readings in DB
    //TODO: insert into DB

    res.json( {200: "OK"})
};

//Update the current backup battery level
exports.updateBackupBatteryLevel = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];
    
    //Retrieve password hash from database for given serial_number
    //TODO: retrieve hash from DB

    //Calculate hash for provided password
    var passwordHash = bcrypt.hashSync(password, 10);

    //Compare calculated hash to retrieved hash
    //TODO: compare calculated hash to retrieved hash

    //Retrieve user_id and greenhouse_id for given serial_number
    //TODO: query DB

    //Store readings in DB
    //TODO: insert into DB

    res.json( {200: "OK"})
};

//Get any pending adjustment commands from backend
exports.getAdjustments = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];
    
    //Retrieve password hash from database for given serial_number
    //TODO: retrieve hash from DB

    //Calculate hash for provided password
    var passwordHash = bcrypt.hashSync(password, 10);

    //Compare calculated hash to retrieved hash
    //TODO: compare calculated hash to retrieved hash

    //Retrieve user_id and greenhouse_id for given serial_number
    //TODO: query DB

    //Retrieve adjustments from DB
    //TODO: query DB

    res.json({adjustments: [[{type: 0, amount: 34.0}, {type: 1, amount: 4.0},], [{type: 1, amount: 3.0}, {type: 2, amount: 41.0},]]})
};