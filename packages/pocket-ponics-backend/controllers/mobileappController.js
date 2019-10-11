//Retrieves all greenhouses for a specific user
exports.getGreenhouses = (req, res) => {

    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    res.json({
        greenhouses: ["298379827453","872932938740","234234235467"]
    })
};

//Update a specified level of the greenhouse with provided values
exports.updateLevel = (req, res) => {

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

//Get all data for specified level of the greenhouse
exports.getLevel = (req, res) => {

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

    res.json({greenhouse_id: "937502957290", user_id: "834058102935", backup_batt_level: 94.0, power_source: 0, level1: "23", level2: "34", level3: "35", level4: "62", greenhouse_name: "Test Greenhouse"})
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

//Adjust the water level, nutrient level or light level for specific level in greenhouse
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

//Get all sensor readings for specified level in greenhouse
exports.getReadingsLevel = (req, res) => {

    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json({water_level: 23.0, pH_level: 7.9, elec_cond: 1.9})
};

//Get all sensor readings for all levels of greenhouse
exports.getReadingsGreenhouse = (req, res) => {

    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    res.json({level1: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, level2: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, level3: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9}, level4: {water_level: 23.0, pH_level: 7.9, elec_cond: 1.9},})
};