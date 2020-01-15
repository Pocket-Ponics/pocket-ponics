import mySQL from './mySQLController';
import { Expo } from 'expo-server-sdk';
const bcrypt = require('bcrypt');

var schedule = require('node-schedule');
 
var rule = new schedule.RecurrenceRule();
rule.hour = 8;
rule.minute = 0;
rule.second = 0;

var n = schedule.scheduleJob(rule, function(){
    sendNotifications()
});

//Retrieves all greenhouses for a specific user
exports.getGreenhouses = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Retrieve all greenhouse_id values from DB for user_id
            mySQL.getGreenhousesForUser(rec.user_id, function(err, record) {
                if(!err)
                {
                    var result = []
                    record.forEach(row => {
                        result.push(row.greenhouse_id)
                    });
    
                    res.json({
                        greenhouses: result
                    })
                } else {
                    res.json({201: "Unable to retrieve greenhouses"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

function sendNotifications() {
    //Find all users where greenhouse seedling_time == today 
    mySQL.getReadySeedlings(function(err, rec) {
        if(err)
        {
            console.log("Couldn't get ready seedlings")
        } 
        else {
            // Create a new Expo SDK client
            let expo = new Expo();

            // Create the messages that you want to send to clents
            var messages = [];

            rec.rows.forEach(row => {
                // Check that all your push tokens appear to be valid Expo push tokens
                if (Expo.isExpoPushToken(row.device_key)) {
                    messages.push({
                        to: row.device_key,
                        sound: 'default',
                        body: 'Your Seedlings Are Ready',
                        data: { greenhouse_id: row.greenhouse_id, user_id: row.user_id, type: 'seedling'},
                    })
                } 
                else
                {
                    console.error(`Push token ${row.device_key} is not a valid Expo push token`);
                }
            });

            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            (async () => {
                for (let chunk of chunks) {
                    try {
                        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                        console.log(ticketChunk);
                        tickets.push(...ticketChunk);
                    } catch (error) {
                        console.error(error);
                    }
                }
            })();
        }
    })

    //Find all users where tier cycle_time == today 
    mySQL.getReadyTiers(function(err, rec) {
        if(err)
        {
            console.log("Couldn't get ready tiers")
        } 
        else {
            // Create a new Expo SDK client
            let expo = new Expo();

            // Create the messages that you want to send to clents
            var messages = [];

            rec.rows.forEach(row => {
                // Check that all your push tokens appear to be valid Expo push tokens
                if (Expo.isExpoPushToken(row.device_key)) {
                    messages.push({
                        to: row.device_key,
                        sound: 'default',
                        body: 'Your Tier is Ready',
                        data: { greenhouse_id: row.greenhouse_id, user_id: row.user_id, tier: row.tier, type: 'tier'},
                    })
                } 
                else
                {
                    console.error(`Push token ${row.device_key} is not a valid Expo push token`);
                }
            });

            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            (async () => {
                for (let chunk of chunks) {
                    try {
                        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                        console.log(ticketChunk);
                        tickets.push(...ticketChunk);
                    } catch (error) {
                        console.error(error);
                    }
                }
            })();
        }
    })
}

exports.addDeviceKey = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store device key provided
    var deviceKey = req.body.devicekey

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            if(deviceKey == undefined)
            {
                res.json({205: "Error: Missing Device Key"})
            }
            else 
            {
                mySQL.addDeviceKeyForUser(rec.user_id, deviceKey, function(err, record) {
                    if(!err)
                    {
                        res.json({200: "Added device key for user"})
                    }
                    else if(record.code == 'ER_DUP_ENTRY')
                    {
                        res.json({203: "Device key already exists"})
                    } 
                    else {
                        res.json({201: "Unable to add device key"})
                    }
                })
            }
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
}

exports.deleteDeviceKey = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store device key provided
    var deviceKey = req.body.devicekey

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {   
            if(deviceKey == undefined)
            {
                res.json({205: "Error: Missing Device Key"})
            }
            else
            {
                mySQL.deleteDeviceKeyForUser(rec.user_id, deviceKey, function(err, record) {
                    if(!err)
                    {
                        res.json({200: "Deleted device key for user"})
                    }
                    else
                    {
                        res.json({201: "Unable to delete device key"})
                    }
                })
            }
            
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
}

//Update a specified tier of the greenhouse with provided values
exports.updateTier = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id and tier provided
    var greenhouse_id = req.params.greenhouse_id
    var tier = req.params.tier

    //Store tier information provided
    var plant_id = req.body.plant_id
    var cycle_time = req.body.cycle_time
    var num_plants = req.body.num_plants

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            if(plant_id == undefined || cycle_time == undefined || num_plants == undefined)
            {
                res.json({202: "Error: Missing data for update"})
            }
            else 
            {
                mySQL.updateTierForGreenhouse(rec.user_id, greenhouse_id, tier, plant_id, cycle_time, num_plants, function(err, record) {
                    if(!err)
                    {
                        res.json({200: "Updated Tier"})
                    }
                    else
                    {
                        res.json({201: "Unable to update tier"})
                    }
                })
            }
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Get all data for specified tier of the greenhouse
exports.getTier = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id and tier provided
    var greenhouse_id = req.params.greenhouse_id
    var tier = req.params.tier

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Retrieve values from tier table for given greenhouse_id, user_id and tier
            mySQL.getTierForGreenhouse(greenhouse_id, tier, rec.user_id, function(err, record) {
                if(!err)
                {
                    res.json( {plant_id: record.plant_id, water_level: record.water_level, cycle_time: record.cycle_time, pH_level: record.pH_level, elec_cond: record.ec_level, num_plants: record.num_plants})
                }
                else
                {
                    res.json({201: "Unable to retrieve tier"})
                }
            })

        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Get all plant ideal data values
exports.getPlantData = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Retrieve values from plant_ideal table 
            mySQL.getPlantIdealData(function(err, record) {
                if(!err)
                {
                    console.log(record.rows)
                    res.json(record.rows)
                }
                else
                {
                    res.json({201: "Unable to retrieve plant ideal data"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Create a new greenhouse with provided values
exports.createGreenhouse = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Store greenhouse name provided
            var greenhouse_name = req.body.name
            var serial_no = req.body.serial_no
            var grid_password = req.body.grid_password
            var seedling_time = req.body.seedling_time

            //Generate password hash for sensor grid
            var grid_hash = bcrypt.hashSync(grid_password, 10)

            //Insert new greenhouse
            mySQL.createGreenhouseForUser(greenhouse_name, seedling_time, rec.user_id, function(err, record) {
                if(!err)
                {
                    // var newGreenhouseID = record.greenhouse_id
                    var newGreenhouseID = record

                    // Insert new values into tier table for given greenhouse_name
                    mySQL.createEmptyTiersAndGridForNewGreenhouse(newGreenhouseID, rec.user_id, serial_no, grid_hash, function(err, record){
                        if(!err)
                        {
                            res.json({200: "Greenhouse Created", id: newGreenhouseID})                                                
                        } 
                        else 
                        { 
                            mySQL.deleteGreenhouseForUser(newGreenhouseID, rec.user_id, function(err, record) {
                                if(err)
                                {
                                    console.log(err)
                                    res.json({202: "Error in rollback of greenhouse creation"})
                                } 
                                else 
                                {
                                    res.json({201: "Error creating greenhouse tiers/sensor grid registration"}) 
                                }
                            })
                        }
                    })
                }
                else {
                    res.json({201: "Error creating greenhouse"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Get values for a greenhouse with specified greenhouse_id
exports.getGreenhouse = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id provided
    var greenhouse_id = req.params.greenhouse_id

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            mySQL.getGreenhouseForUser(rec.user_id, greenhouse_id, function(err, record) {
                if(!err)
                {
                    res.json({water_level: record.water_level, nutrient_level: record.nutrient_level, light_level: record.light_level, seedling_time: record.seedling_time, backup_batt_level: record.battery, power_source: record.power_source, greenhouse_name: record.name})
                }
                else {
                    res.json({201: "Error retrieving greenhouse"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Get readings for a greenhouse with specified greenhouse_id for specified date range
exports.getGreenhouseReadings = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id and date range provided
    var greenhouse_id = req.params.greenhouse_id
    var start_date = req.body.start_date
    var end_date = req.body.end_date

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            mySQL.getGreenhouseHistoricalData(rec.user_id, greenhouse_id, start_date, end_date, function(err, record) {
                if(!err)
                {
                    res.json({history: record})
                }
                else {
                    res.json({201: "Error retrieving greenhouse historical data"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Update greenhouse with provided values
exports.updateGreenhouse = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id provided
    var greenhouse_id = req.params.greenhouse_id

    //Store greenhouse information provided
    var name = req.body.name
    var seedling_time = req.body.seedling_time

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            if(seedling_time == undefined || name == undefined)
            {
                res.json({202: "Error: Missing data for update"})
            }
            else 
            {
                mySQL.updateGreenhouseForUser(rec.user_id, greenhouse_id, name, seedling_time, function(err, record) {
                    if(!err)
                    {
                        res.json({200: "Updated Greenhouse"})
                    }
                    else
                    {
                        res.json({201: "Unable to update greenhouse"})
                    }
                })
            }
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Delete greenhouse with specified greenhouse_id
exports.deleteGreenhouse = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id provided
    var greenhouse_id = req.params.greenhouse_id

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            mySQL.deleteGreenhouseForUser(greenhouse_id, rec.user_id, function(err, record){
                if(!err)
                {
                    res.json({200: "Greenhouse Deleted"})
                } 
                else 
                { 
                    res.json({201: "Error deleting greenhouse"}) 
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Adjust the water level, nutrient level or light level for specific tier in greenhouse
exports.makeAdjustments = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse information provided
    var adjustment_type = req.body.adjustment_type
    var amount = req.body.amount

    //Store greenhouse_id and tier provided
    var greenhouse_id = req.params.greenhouse_id
    var tier = req.params.tier

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Add adjustment to queue
            if(adjustment_type >= 0 && adjustment_type <= 2)
            {
                mySQL.createAdjustmentForGreenhouse(rec.user_id, greenhouse_id, adjustment_type, amount, tier, function(err, record) {
                    if(!err)
                    {
                        res.json({200: "Adjustment Queued"})
                    }
                    else {
                        res.json({201: "Error adding adjustment to queue"})
                    }
                })
            } else {
                res.json({201: "Error adding adjustment to queue"})
            }
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Get the current sensor reading for a single sensor type
exports.getReadingsSingle = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id, tier and sensor type provided
    var greenhouse_id = req.params.greenhouse_id
    var tier = req.params.tier
    var sensor_type = req.params.sensor_type

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Get sensor reading
            mySQL.getReadingForSensors(rec.user_id, greenhouse_id, tier, function(err, record) {
                if(!err)
                {
                    var value = 0.0
                    if(sensor_type == 0)
                    {
                        value = record.water_level
                    } 
                    else if(sensor_type == 1) 
                    {
                        value = record.ph_level
                    } 
                    else if(sensor_type == 2)
                    {
                        value = record.ec_level
                    }
                    res.json({reading: value})
                }
                else {
                    res.json({201: "Error retrieving sensor reading"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Get all sensor readings for specified tier in greenhouse
exports.getReadingsTier = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id, tier and provided
    var greenhouse_id = req.params.greenhouse_id
    var tier = req.params.tier

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Get sensor readings
            mySQL.getReadingForSensors(rec.user_id, greenhouse_id, tier, function(err, record) {
                if(!err)
                {
                    res.json({water_level: record.water_level, ph_level: record.ph_level, ec_level: record.ec_level})
                }
                else {
                    res.json({201: "Error retrieving sensor readings"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//Get greenhouse and teir data
exports.getGreenhouseAndTiers = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id provided
    var greenhouse_id = req.params.greenhouse_id

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Get sensor readings
            mySQL.getGreenhouseDetail(rec.user_id, greenhouse_id, function(err, record) {
                if(!err)
                {
                    res.json(record)
                }
                else {
                    console.log(err)
                    res.json({201: "Error retrieving sensor readings"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
}

//Get all sensor readings for all tiers of greenhouse
exports.getReadingsGreenhouse = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id provided
    var greenhouse_id = req.params.greenhouse_id

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Get sensor readings
            mySQL.getReadingsForGreenhouse(rec.user_id, greenhouse_id, function(err, record) {
                if(!err)
                {
                    res.json({readings: record})
                }
                else {
                    res.json({201: "Error retrieving sensor readings"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//TODO: Set greenhouse sensor grid values
