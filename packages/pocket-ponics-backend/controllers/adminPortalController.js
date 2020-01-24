import mySQL from './mySQLController';

//Retrieves all plant ideals
exports.getPlantIdeals = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.status(403)
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            mySQL.getRoleForUser(rec.user_id, function(err, rec2){
                if(err)
                {
                    res.status(403)
                    res.json({403: "Authentication Error"})
                }
                else if(rec2.admin == 1)
                {
                    //Retrieve all plant ideal values from DB
                    mySQL.getAllPlantIdeals(function(err, record) {
                        if(!err)
                        {
                            res.status(200)
                            res.json(record.rows)
                        } else {
                            res.status(201)
                            res.json({201: "Unable to retrieve plant ideals"})
                        }
                    })
                }
                else 
                {
                    res.status(401)
                    res.json({401: "Unauthorized"})
                }
            })
        }
        else 
        {
            res.status(401)
            res.json({401: "Unauthorized"})
        }
    })
};

//Delete a plant ideal value from DB
exports.deletePlantIdeal = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store plant id
    var plant_id = req.body.plant_id

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.status(403)
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            mySQL.getRoleForUser(rec.user_id, function(err, rec2){
                if(err)
                {
                    res.status(403)
                    res.json({403: "Authentication Error"})
                }
                else if(rec2.admin == 1)
                {
                    //Delete plant ideal from DB
                    mySQL.deletePlantIdeal(plant_id, function(err, record) {
                        if(!err)
                        {
                            res.status(200)
                            res.json({200: "Deleted plant ideal"})
                        } else {
                            res.status(201)
                            res.json({201: "Unable to delete plant ideal"})
                        }
                    })
                }
                else 
                {
                    res.status(401)
                    res.json({401: "Unauthorized"})
                }
            })
        }
        else 
        {
            res.status(401)
            res.json({401: "Unauthorized"})
        }
    })
};

//Creates a new plant ideal record 
exports.createPlantIdeal = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store values provided
    var ph_level_low = req.body.ph_level_low
    var ec_level_low = req.body.ec_level_low
    var temp_low = req.body.temp_low
    var cycle_time = req.body.cycle_time
    var ph_level_high = req.body.ph_level_high
    var ec_level_high = req.body.ec_level_high
    var temp_high = req.body.temp_high
    var name = req.body.name
    var light_time = req.body.light_time

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.status(403)
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            mySQL.getRoleForUser(rec.user_id, function(err, rec2){

                if(err)
                {
                    res.status(403)
                    res.json({403: "Authentication Error"})
                }
                else if(rec2.admin == 1)
                {
                    //Create new plant ideal value in DB
                    mySQL.createPlantIdeal(ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time, function(err, record) {
                        if(!err)
                        {
                            res.status(200)
                            res.json({200: "Created plant ideal", plant_id: record})
                        } else {
                            res.status(201)
                            res.json({201: "Unable to create plant ideal"})
                        }
                    })
                }
                else 
                {
                    res.status(401)
                    res.json({401: "Unauthorized"})
                }
            })
        }
        else 
        {
            res.status(401)
            res.json({401: "Unauthorized"})
        }
    })
}

//Update existing plant ideal record
exports.updatePlantIdeal = (req, res) => {
    //Get auth token
    let cred = req.headers.authorization.split(" ")[1]

    //Store values provided
    var plant_id = req.body.plant_id
    var ph_level_low = req.body.ph_level_low
    var ec_level_low = req.body.ec_level_low
    var temp_low = req.body.temp_low
    var cycle_time = req.body.cycle_time
    var ph_level_high = req.body.ph_level_high
    var ec_level_high = req.body.ec_level_high
    var temp_high = req.body.temp_high
    var name = req.body.name
    var light_time = req.body.light_time

    //Retrieve user_id for given auth token
    mySQL.getUserForToken(cred, function(err, rec) {
        if(err)
        {
            res.status(403)
            res.json({403: "Authentication Error"})
        }
        else if(rec != undefined)
        {    
            mySQL.getRoleForUser(rec.user_id, function(err, rec2){

                if(err)
                {
                    res.status(403)
                    res.json({403: "Authentication Error"})
                }
                else if(rec2.admin == 1)
                {
                    //Update plant ideal value in DB
                    mySQL.updatePlantIdeal(plant_id, ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time, function(err, record) {
                        if(!err)
                        {
                            res.status(200)
                            res.json({200: "Updated plant ideal"})
                        } else {
                            res.status(201)
                            res.json({201: "Unable to update plant ideal"})
                        }
                    })
                }
                else 
                {
                    res.status(401)
                    res.json({401: "Unauthorized"})
                }
            })
        }
        else 
        {
            res.status(401)
            res.json({401: "Unauthorized"})
        }
    })
}