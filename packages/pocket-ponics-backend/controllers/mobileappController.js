import mySQL from '../models/mySQLModel';

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

//Update a specified tier of the greenhouse with provided values
exports.updateTier = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store greenhouse_id and tier_id provided
    var greenhouse_id = req.params.greenhouse_id
    var tier_id = req.params.tier

    //Store tier information provided
    var growth_stage = req.body.growth_stage
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
            if(growth_stage == undefined || plant_id == undefined || cycle_time == undefined || num_plants == undefined)
            {
                res.json({202: "Error: Missing data for update"})
            }
            else 
            {
                mySQL.updateTierForGreenhouse(rec.user_id, greenhouse_id, tier_id, plant_id, growth_stage, cycle_time, num_plants, function(err, record) {
                    if(!err)
                    {
                        res.json({200: "Updated tier"})
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

    //Store greenhouse_id and tier_id provided
    var greenhouse_id = req.params.greenhouse_id
    var tier_id = req.params.tier

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            //Retrieve values from tier table for given greenhouse_id, user_id and tier_id
            mySQL.getTierForGreenhouse(greenhouse_id, tier_id, rec.user_id, function(err, record) {
                if(!err)
                {
                    res.json( {plant_id: record.plant_id, growth_stage: record.growth_stage, water_level: record.water_level, cycle_time: record.cycle_time, pH_level: record.pH_level, elec_cond: record.ec_level, num_plants: record.num_plants})
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

            //Insert new greenhouse
            mySQL.createGreenhouseForUser(greenhouse_name, rec.user_id, function(err, record) {
                if(!err)
                {
                    var newGreenhouseID = record["LAST_INSERT_ID()"]
                    
                    // Insert new values into tier table for given greenhouse_name
                    mySQL.createEmptyTierForNewGreenhouse(newGreenhouseID, 1, rec.user_id, function(err, record){
                        if(!err)
                        {
                            mySQL.createEmptyTierForNewGreenhouse(newGreenhouseID, 2, rec.user_id, function(err, record){
                                if(!err)
                                {
                                    mySQL.createEmptyTierForNewGreenhouse(newGreenhouseID, 3, rec.user_id, function(err, record){
                                        if(!err)
                                        {
                                            mySQL.createEmptyTierForNewGreenhouse(newGreenhouseID, 4, rec.user_id, function(err, record){
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

//TODO: Get readings for a greenhouse with specified greenhouse_id for specified date range
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
                        res.json({200: "Updated greenhouse"})
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
            //Delete greenhouse
            mySQL.deleteTiersForGreenhouse(greenhouse_id, rec.user_id, function(err, record) {
                if(!err)
                {
                    // Delete records in tier table for given greenhouse_id
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
                else {
                    res.json({201: "Error deleting greenhouse tier(s)"})
                }
            })
        }
        else 
        {
            res.json({401: "Unauthorized"})
        }
    })
};

//TODO: Adjust the water level, nutrient level or light level for specific tier in greenhouse
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

//TODO: Get the current sensor reading for a single sensor type
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

//TODO: Get all sensor readings for specified tier in greenhouse
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

//TODO: Get all sensor readings for all tiers of greenhouse
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