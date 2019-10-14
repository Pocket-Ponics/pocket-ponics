//Retrieves all greenhouses for a specific user
exports.getGreenhouses = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    res.json({
        greenhouses: ["298379827453","872932938740","234234235467"]
    })
};

//Update a specified tier of the greenhouse with provided values
exports.updateTier = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    //new values
    console.log(req.body)

    res.json({
        200: "OK"
    })
};

//Get all data for specified tier of the greenhouse
exports.getTier = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json( {plant_id: "029468109359", growth_stage: "2", plant_type_id: "3", water_level: 23.0, light_level: 8.0, cycle_time: 24.0, pH_level: 7.8, elec_cond: 2.1})
};

//Create a new greenhouse with provided values
exports.createGreenhouse = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    //provided values
    console.log(req.body)

    res.json({200: "OK"})
};

//Get values for a greenhouse with specified greenhouse_id
exports.getGreenhouse = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json({greenhouse_id: "937502957290", user_id: "834058102935", backup_batt_level: 94.0, power_source: 0, tier1: "23", tier2: "34", tier3: "35", tier4: "62", greenhouse_name: "Test Greenhouse"})
};

//Get readings for a greenhouse with specified greenhouse_id for specified date range
exports.getGreenhouseReadings = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json({greenhouse_id: "937502957290", user_id: "834058102935", backup_batt_level: [{date: "2016-09-26", reading: 94.0},{date: "2016-09-27", reading: 93.1}], power_source: [{date: "2016-09-26", reading: 0},{date: "2016-09-27", reading: 1}], greenhouse_name: "Test Greenhouse"})
};

//Update greenhouse with provided values
exports.updateGreenhouse = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    //provided values
    console.log(req.body)

    res.json({200: "OK"})
};

//Delete greenhouse with specified greenhouse_id
exports.deleteGreenhouse = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json({200: "OK"})
};

//Adjust the water level, nutrient level or light level for specific tier in greenhouse
exports.makeAdjustments = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    //provided values
    console.log(req.body)

    res.json({200: "OK"})
};

//Get the current sensor reading for a single sensor type
exports.getReadingsSingle = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json({reading: 23.0})
};

//Get all sensor readings for specified tier in greenhouse
exports.getReadingsTier = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json({water_level: 23.0, pH_level: 7.9, elec_cond: 1.9})
};

//Get all sensor readings for all tiers of greenhouse
exports.getReadingsGreenhouse = (req, res) => {
    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json({tier1: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, tier2: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, tier3: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, tier4: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9},})
};