//Retrieves all greenhouses for a specific user
exports.getGreenhouses = (req, res) => {

    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //sensor readings
    console.log(req.body)

    res.json({
        greenhouses: ["test_ID", "test2_ID", "test3_ID"]
    })
};

//Update a specified level of the greenhouse with provided values
exports.updateLevel = (req, res) => {

    //get auth token
    let cred = req.headers.authorization.split(" ")[1]
    console.log(cred)

    //get parameters passed through url
    console.log(req.params)

    //sensor readings
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

    res.json({
        test: "test value"
    })
};