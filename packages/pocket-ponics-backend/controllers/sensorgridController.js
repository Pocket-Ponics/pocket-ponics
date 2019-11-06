const bcrypt = require('bcrypt');
const crypto = require('crypto');
import mySQL from '../models/mySQLModel';

//Post all sensor readings for all tiers of greenhouse
exports.postReadingsGreenhouse = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];

    //Store greenhouse readings provided
    var greenhouse_name = req.body.name
    var power_supply = req.body.power_supply
    var backup_battery_level = req.body.backup_battery_level
    var tier1_water = req.body.tier1_water
    var tier1_ph = req.body.tier1_ph
    var tier1_ec = req.body.tier1_ec
    var tier2_water = req.body.tier2_water
    var tier2_ph = req.body.tier2_ph
    var tier2_ec = req.body.tier2_ec
    var tier3_water = req.body.tier3_water
    var tier3_ph = req.body.tier3_ph
    var tier3_ec = req.body.tier3_ec
    var tier4_water = req.body.tier4_water
    var tier4_ph = req.body.tier4_ph
    var tier4_ec = req.body.tier4_ec
    var water_level = req.body.water_level
    var nutrient_level = req.body.nutrient_level
    var seedling_time = req.body.seedling_time
    var light_level = req.body.light_level

    //Retrieve password hash from database for given email
    mySQL.getHashForSensorGrid(serial_no, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.json({402: "Sensor Grid Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(password, record.password_hash, (err, result) => {
                if(result)
                {
                    //Update greenhouse record and tiers record
                    //TODO: Implement transaction for updating greenhouse record and tiers records and historical data 
                    mySQL.updateReadingsForGreenhouse(record.user_id, record.greenhouse_id, water_level, nutrient_level, backup_battery_level, power_supply, seedling_time, light_level, function(err, record) {
                        if(!err)
                        {
                            res.json({200: "Sensor Readings Recorded"})
                        }
                        else {
                            res.json({201: "Error recording greenhouse readings"})
                        }
                    })

                    //Create record in historical data table
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
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
//TODO: Add trigger for inserting rows into historical data table
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
//TODO: Add trigger for inserting rows into historical data table
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