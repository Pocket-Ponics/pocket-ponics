import mySQL from './mySQLController';
import notificationController from './notificationController';
const bcrypt = require('bcrypt-nodejs');
import * as tf from '@tensorflow/tfjs-node'
var schedule = require('node-schedule');
const sharp = require('sharp');
var fs = require('fs');

loadNeuralNetwork()

var rule = new schedule.RecurrenceRule();
rule.hour = 8;
rule.minute = 0;
rule.second = 0;

var n = schedule.scheduleJob(rule, function(){
    notificationController.sendSeedlingAndTierNotifications()
});

async function loadNeuralNetwork()
{
    global.model = await tf.loadLayersModel('file://../pocket-ponics-backend/neuralnetwork-model/model/model.json')
    console.log("Loaded Neural Network Model for Classification")
}

//Retrieves all greenhouses for a specific user
exports.getGreenhouses = (req, res) => {

    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
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
                //Retrieve all greenhouse_id values from DB for user_id
                mySQL.getGreenhousesForUser(rec.user_id, function(err, record) {
                    if(!err)
                    {
                        var result = []
                        record.forEach(row => {
                            result.push(row.greenhouse_id)
                        });
                        res.status(200)
                        res.json({
                            greenhouses: result
                        })
                    } else {
                        res.status(201)
                        res.json({201: "Unable to retrieve greenhouses", error: record.sqlMessage})
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
};

exports.addDeviceKey = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store device key provided
        var deviceKey = req.body.devicekey

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                if(deviceKey == undefined)
                {
                    res.status(205)
                    res.json({205: "Error: Missing Device Key"})
                }
                else 
                {
                    mySQL.addDeviceKeyForUser(rec.user_id, deviceKey, function(err, record) {
                        if(!err)
                        {
                            res.status(200)
                            res.json({200: "Added device key for user"})
                        }
                        else if(record.code == 'ER_DUP_ENTRY')
                        {
                            res.status(203)
                            res.json({203: "Device key already exists"})
                        } 
                        else {
                            res.status(201)
                            res.json({201: "Unable to add device key", error: record.sqlMessage})
                        }
                    })
                }
            }
            else 
            {
                res.status(401)
                res.json({401: "Unauthorized"})
            }
        })
    }
}

exports.deleteDeviceKey = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store device key provided
        var deviceKey = req.body.devicekey

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {   
                if(deviceKey == undefined)
                {
                    res.status(205)
                    res.json({205: "Error: Missing Device Key"})
                }
                else
                {
                    mySQL.deleteDeviceKeyForUser(rec.user_id, deviceKey, function(err, record) {
                        if(!err)
                        {
                            res.status(200)
                            res.json({200: "Deleted device key for user", error: record.sqlMessage})
                        }
                        else
                        {
                            res.status(201)
                            res.json({201: "Unable to delete device key", error: record.sqlMessage})
                        }
                    })
                }
                
            }
            else 
            {
                res.status(401)
                res.json({401: "Unauthorized"})
            }
        })
    }
}

//Update a specified tier of the greenhouse with provided values
exports.updateTier = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store greenhouse_id and tier provided
        var greenhouse_id = req.params.greenhouse_id
        var tier = req.params.tier

        //Store tier information provided
        var plant_id = req.body.plant_id
        var cycle_time = req.body.cycle_time
        var light_start = req.body.light_start

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                if(plant_id == undefined || cycle_time == undefined || light_start == undefined)
                {
                    res.status(202)
                    res.json({202: "Error: Missing data for update"})
                }
                else 
                {
                    mySQL.updateTierForGreenhouse(rec.user_id, greenhouse_id, tier, plant_id, cycle_time, light_start, function(err, record) {
                        if(!err)
                        {
                            res.status(200)
                            res.json({200: "Updated Tier"})
                        }
                        else
                        {
                            res.status(201)
                            res.json({201: "Unable to update tier", error: record.sqlMessage})
                        }
                    })
                }
            }
            else 
            {
                res.status(401)
                res.json({401: "Unauthorized"})
            }
        })
    }
};

//Get all data for specified tier of the greenhouse
exports.getTier = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store greenhouse_id and tier provided
        var greenhouse_id = req.params.greenhouse_id
        var tier = req.params.tier

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                //Retrieve values from tier table for given greenhouse_id, user_id and tier
                mySQL.getTierForGreenhouse(greenhouse_id, tier, rec.user_id, function(err, record) {
                    if(!err)
                    {
                        res.status(200)
                        res.json(record)
                    }
                    else
                    {
                        res.status(201)
                        res.json({201: "Unable to retrieve tier", error: record.sqlMessage})
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
};

//Get all plant ideal data values
exports.getPlantData = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
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
                //Retrieve values from plant_ideal table 
                mySQL.getPlantIdealData(function(err, record) {
                    if(!err)
                    {
                        res.status(200)
                        res.json(record.rows)
                    }
                    else
                    {
                        res.status(201)
                        res.json({201: "Unable to retrieve plant ideal data", error: record.sqlMessage})
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
};

//Create a new greenhouse with provided values
exports.createGreenhouse = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
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
                //Store greenhouse name provided
                var greenhouse_name = req.body.name
                var serial_no = req.body.serial_no
                var grid_password = req.body.grid_password
                var seedling_time = req.body.seedling_time

                //Generate password hash for sensor grid
                var salt = bcrypt.genSaltSync(10)
                var grid_hash = bcrypt.hashSync(grid_password, salt)

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
                                res.status(200)
                                res.json({200: "Greenhouse Created", id: newGreenhouseID})                                                
                            } 
                            else 
                            { 
                                mySQL.deleteGreenhouseForUser(newGreenhouseID, rec.user_id, function(err, record) {
                                    if(err)
                                    {
                                        console.log(err)
                                        res.status(202)
                                        res.json({202: "Error in rollback of greenhouse creation", error: record.sqlMessage})
                                    } 
                                    else 
                                    {
                                        res.status(201)
                                        res.json({201: "Error creating greenhouse tiers/sensor grid registration", error: record.sqlMessage}) 
                                    }
                                })
                            }
                        })
                    }
                    else {
                        res.status(201)
                        res.json({201: "Error creating greenhouse", error: record.sqlMessage})
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
};

//Get values for a greenhouse with specified greenhouse_id
exports.getGreenhouse = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store greenhouse_id provided
        var greenhouse_id = req.params.greenhouse_id

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                mySQL.getGreenhouseForUser(rec.user_id, greenhouse_id, function(err, record) {
                    if(!err)
                    {
                        res.status(200)
                        res.json({water_level: record.water_level, nutrient_level: record.nutrient_level, light_level: record.light_level, seedling_time: record.seedling_time, backup_batt_level: record.battery, power_source: record.power_source, greenhouse_name: record.name})
                    }
                    else {
                        res.status(201)
                        res.json({201: "Error retrieving greenhouse", error: record.sqlMessage})
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
};

//Get readings for a greenhouse with specified greenhouse_id for specified date range
exports.getGreenhouseReadings = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store greenhouse_id and date range provided
        var greenhouse_id = req.params.greenhouse_id

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                mySQL.getGreenhouseHistoricalData(rec.user_id, greenhouse_id, function(err, record) {
                    if(!err)
                    {
                        res.status(200)
                        res.json({history: record})
                    }
                    else {
                        res.status(201)
                        res.json({201: "Error retrieving greenhouse historical data", error: record.sqlMessage})
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
};

//Update greenhouse with provided values
exports.updateGreenhouse = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
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
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                console.log(seedling_time)
                if(name == undefined)
                {
                    res.status(202)
                    res.json({202: "Error: Missing data for update"})
                }
                else 
                {
                    mySQL.updateGreenhouseForUser(rec.user_id, greenhouse_id, name, seedling_time, function(err, record) {
                        if(!err)
                        {
                            res.status(200)
                            res.json({200: "Updated Greenhouse"})
                        }
                        else
                        {
                            res.status(201)
                            res.json({201: "Unable to update greenhouse", error: record.sqlMessage})
                        }
                    })
                }
            }
            else 
            {
                res.status(401)
                res.json({401: "Unauthorized"})
            }
        })
    }
};

//Delete greenhouse with specified greenhouse_id
exports.deleteGreenhouse = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store greenhouse_id provided
        var greenhouse_id = req.params.greenhouse_id

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                mySQL.deleteGreenhouseForUser(greenhouse_id, rec.user_id, function(err, record){
                    if(!err)
                    {
                        res.status(200)
                        res.json({200: "Greenhouse Deleted"})
                    } 
                    else 
                    { 
                        res.status(201)
                        res.json({201: "Error deleting greenhouse", error: record.sqlMessage}) 
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
};

//Get the current sensor reading for a single sensor type
exports.getReadingsSingle = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
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
                res.status(403)
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
                        res.status(200)
                        res.json({reading: value})
                    }
                    else {
                        res.status(201)
                        res.json({201: "Error retrieving sensor reading", error: record.sqlMessage})
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
};

//Get all sensor readings for specified tier in greenhouse
exports.getReadingsTier = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store greenhouse_id, tier and provided
        var greenhouse_id = req.params.greenhouse_id
        var tier = req.params.tier

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                //Get sensor readings
                mySQL.getReadingForSensors(rec.user_id, greenhouse_id, tier, function(err, record) {
                    if(!err)
                    {
                        res.status(200)
                        res.json({water_level: record.water_level, ph_level: record.ph_level, ec_level: record.ec_level})
                    }
                    else {
                        res.status(201)
                        res.json({201: "Error retrieving sensor readings", error: record.sqlMessage})
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
};

//Get greenhouse and tier data
exports.getGreenhouseAndTiers = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store greenhouse_id provided
        var greenhouse_id = req.params.greenhouse_id

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                mySQL.getGreenhouseDetail(rec.user_id, greenhouse_id, function(err, record) {
                    if(!err)
                    {
                        res.status(200)
                        res.json(record)
                    }
                    else {
                        console.log(err)
                        res.status(201)
                        res.json({201: "Error retrieving greenhouse and tier", error: record.sqlMessage})
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
}

//Get all sensor readings for all tiers of greenhouse
exports.getReadingsGreenhouse = (req, res) => {
    if(req.headers.authorization == undefined)
    {
        res.status(210)
        res.json({210: "Error: Missing Token"})
    }
    else
    {
        //Get auth token
        let cred = req.headers.authorization.split(" ")[1]

        //Store greenhouse_id provided
        var greenhouse_id = req.params.greenhouse_id

        //Retrieve user_id for given auth token
        mySQL.getUserForToken(cred, function(err, rec) {
            if(err)
            {
                res.status(403)
                res.json({403: "Authentication Error"})
            }
            else if(rec != undefined)
            {    
                //Get sensor readings
                mySQL.getReadingsForGreenhouse(rec.user_id, greenhouse_id, function(err, record) {
                    if(!err)
                    {
                        res.status(200)
                        res.json({readings: record})
                    }
                    else {
                        res.status(201)
                        res.json({201: "Error retrieving sensor readings", error: record.sqlMessage})
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
};

//Classify plant image using neural network
exports.classifyPlantImage = (req, res) => {
    //Store plant image provided
    var plantImageStr = req.body.image

    //Generate new file name for image
    var suffix = Math.random() * (1000 - 0) + 0
    var imageStr = `classify-temp/temp${suffix}.jpeg`

    //Convert base-64 to image and write to disk
    fs.writeFile(imageStr, plantImageStr, {encoding: 'base64'}, function(err) {
        if(!err)
        {
            console.log('File created successfully');

            //Classify plant image
            classifyPlant(imageStr, (err, prediction, probability, createdFiles) => {
                //Delete temporary files
                createdFiles.forEach(file => {
                    fs.unlink(file, function(err) {
                        if(!err)
                        {
                            console.log('File deleted successfully')
                        }
                        else 
                        {
                            console.log('File deleted unsuccessfully')
                        }
                    });
                })

                if(err)
                {
                    res.status(201)
                    res.json({201: "Error: Unable to Perform Classification", error: err.toString()})
                }
                else
                {
                    res.status(200)
                    res.json({200: "Classification Complete", prediction: prediction, probability: probability})
                }
            })
        }
        else
        {
            console.log('File created unsuccessfully');
            res.status(201)
            res.json({201: "Classification Error"})
        }
    });
};

//Classify plant as ripe/unripe and identify type of plant
async function classifyPlant(imagePath, callback){
    //Generate new file name for image
    var suffix = Math.random() * (1000 - 0) + 0
    var resizedImage = `classify-temp/temp${suffix}.jpeg`
    var createdFiles = [imagePath, resizedImage]

    //Resize image and store as JPEG
    sharp(imagePath).resize(331, 331).toFile(resizedImage, (err, info) => { 
        if(!err)
        {
            //Read in resized image
            var image = fs.readFileSync(resizedImage)

            //Define the classes
            var classes = ['ripe-greenbeans','ripe-spinach','ripe-tomato','ripe-turnip','unripe-greenbeans','unripe-spinach','unripe-tomato','unripe-turnip']
            
            //Convert image to tensor
            var tensorImage = tf.node.decodeJpeg(image, 3);

            //Normalize tensor values
            var tensorImageInput = tensorImage.div(tf.scalar(255))

            //Predict class from tensor input
            var predictionTensor = model.predict(tensorImageInput.expandDims(0))

            //Convert tensor output to class
            var index = predictionTensor.argMax(1).arraySync()
            var probability = predictionTensor.arraySync()[0][index]
            var prediction = classes[index[0]]
            callback(false, prediction, probability, createdFiles)
        }
        else
        {
            console.log(err)
            callback(err, err, 0.00, [])
        }
    });
};
