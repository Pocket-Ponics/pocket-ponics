import mySQL from '../models/mySQLModel';
import async from 'async'
import { callbackify } from 'util';

//Retrieves all greenhouses for a specific user
exports.getGreenhouses = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record != undefined)
        {    
            //Retrieve all greenhouse_id values from DB for user_id
            mySQL.getGreenhousesForUser(record.user_id, function(err, record) {
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

//Update a specified tier of the greenhouse with provided values
exports.updateTier = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id and tier_id provided
    var greenhouse_id = req.params.greenhouse_id
    var tier_id = req.params.tier
    
    //Retrieve user_id for given auth token
    //TODO: retrieve user_id from DB
    
    //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
    //TODO: query DB

    //Insert new values into tier table for given greenhouse_id and tier_id
    //TODO: insert into DB

    res.json({
        200: "OK"
    })
};

//Get all data for specified tier of the greenhouse
exports.getTier = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]
    
    //Retrieve user_id for given auth token
    //TODO: retrieve user_id from DB

    //Store greenhouse_id and tier_id provided
    var greenhouse_id = req.params.greenhouse_id
    var tier_id = req.params.tier

    //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
    //TODO: query DB

    //Retrieve values from tier table for given greenhouse_id and tier_id
    //TODO: query DB

    res.json( {plant_id: "029468109359", growth_stage: "2", plant_type_id: "3", water_level: 23.0, light_level: 8.0, cycle_time: 24.0, pH_level: 7.8, elec_cond: 2.1})
};

//Create a new greenhouse with provided values
exports.createGreenhouse = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record != undefined)
        {    
            //Store greenhouse name provided
            var greenhouse_name = req.body.name

            //Insert new greenhouse
            mySQL.createGreenhouseForUser(greenhouse_name, record.user_id, function(err, record) {
                if(!err)
                {
                    var newGreenhouseID = record["LAST_INSERT_ID()"]

                    // Insert new values into tier table for given greenhouse_name
                    mySQL.createEmptyTierForNewGreenhouse(newGreenhouseID, 1, function(err, record){
                        if(!err)
                        {
                            mySQL.createEmptyTierForNewGreenhouse(newGreenhouseID, 2, function(err, record){
                                if(!err)
                                {
                                    mySQL.createEmptyTierForNewGreenhouse(newGreenhouseID, 3, function(err, record){
                                        if(!err)
                                        {
                                            mySQL.createEmptyTierForNewGreenhouse(newGreenhouseID, 4, function(err, record){
                                                if(!err)
                                                {
                                                    res.json({200: "Greenhouse Created"})
                                                } 
                                                else 
                                                { 
                                                    res.json({201: "Error creating greenhouse tier"}) 
                                                }
                                            })
                                        } 
                                        else 
                                        { 
                                            res.json({201: "Error creating greenhouse tier"}) 
                                        }
                                    })
                                } 
                                else 
                                { 
                                    res.json({201: "Error creating greenhouse tier"}) 
                                }
                            })
                        } 
                        else 
                        { 
                            res.json({201: "Error creating greenhouse tier"}) 
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
    mySQL.getUserForToken(cred, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record != undefined)
        {    
            mySQL.getGreenhouseForUser(record.user_id, greenhouse_id, function(err, record) {
                if(!err)
                {
                    res.json({greenhouse_id: greenhouse_id, user_id: record.user_id, water_level: record.rows[0].water_level, nutrient_level: record.rows[0].nutrient_level, seedling_time: record.rows[0].seedling_time, backup_batt_level: record.rows[0].battery, power_source: record.rows[0].power_source, greenhouse_name: record.rows[0].name})
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

    //Retrieve user_id for given auth token
    //TODO: retrieve user_id from DB

    //Store greenhouse_id and date range provided
    var greenhouse_id = req.params.greenhouse_id
    var start_date = req.params.start
    var end_date = req.params.end

    //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
    //TODO: query DB

    //Retrieve sensor readings for greenhouse_id and date range provided
    //TODO: query DB

    res.json({greenhouse_id: "937502957290", user_id: "834058102935", backup_batt_level: [{date: "2016-09-26", reading: 94.0},{date: "2016-09-27", reading: 93.1}], power_source: [{date: "2016-09-26", reading: 0},{date: "2016-09-27", reading: 1}], greenhouse_name: "Test Greenhouse"})
};

//Update greenhouse with provided values
exports.updateGreenhouse = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    //TODO: retrieve user_id from DB

    //Store greenhouse_id provided
    var greenhouse_id = req.params.greenhouse_id

    //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
    //TODO: query DB

    //Insert new values into greenhouse table for given greenhouse_id
    //TODO: insert into DB

    res.json({200: "OK"})
};

//Delete greenhouse with specified greenhouse_id
exports.deleteGreenhouse = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    //TODO: retrieve user_id from DB

    //Store greenhouse_id provided
    var greenhouse_id = req.params.greenhouse_id

    //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
    //TODO: query DB

    //Delete greenhouse given greenhouse_id
    //TODO: query DB

    res.json({200: "OK"})
};

//Adjust the water level, nutrient level or light level for specific tier in greenhouse
exports.makeAdjustments = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    //TODO: retrieve user_id from DB

    //Store greenhouse_id and tier_id provided
    var greenhouse_id = req.params.greenhouse_id
    var tier_id = req.params.tier

    //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
    //TODO: query DB

    //Store adjustment in DB
    //TODO: query DB

    res.json({200: "OK"})
};

//Get the current sensor reading for a single sensor type
exports.getReadingsSingle = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    //TODO: retrieve user_id from DB

    //Store greenhouse_id, tier_id and sensor type provided
    var greenhouse_id = req.params.greenhouse_id
    var tier_id = req.params.tier
    var sensor_type = req.params.sensor_type

    //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
    //TODO: query DB

    //Retrieve sensor reading for specified greenhouse_id, tier_id and sensor_type
    //TODO: query DB

    res.json({reading: 23.4})
};

//Get all sensor readings for specified tier in greenhouse
exports.getReadingsTier = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    //TODO: retrieve user_id from DB

    //Store greenhouse_id and tier_id provided
    var greenhouse_id = req.params.greenhouse_id
    var tier_id = req.params.tier

    //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
    //TODO: query DB

    //Retrieve sensor readings for specified greenhouse_id and tier_id
    //TODO: query DB

    res.json({water_level: 23.0, pH_level: 7.9, elec_cond: 1.9})
};

//Get all sensor readings for all tiers of greenhouse
exports.getReadingsGreenhouse = (req, res) => {
     //Get auth token
     let cred = req.headers.authorization.split(" ")[1]

     //Retrieve user_id for given auth token
     //TODO: retrieve user_id from DB
 
     //Store greenhouse_id provided
     var greenhouse_id = req.params.greenhouse_id
 
     //Check if greenhouse_id is valid for user_id and greenhouse_id provided - do this in the model to make sure nothing gets missed
     //TODO: query DB
 
     //Retrieve sensor readings for specified greenhouse_id
     //TODO: query DB

    res.json({tier1: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, tier2: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, tier3: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, tier4: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9},})
};