var mysql = require('mysql')
var sqlController = require('../controllers/mySQLController')

var con = mysql.createConnection({
    host: 'localhost',
    user: 'rohan',
    password: 'password',
    database: 'pocketponics'
})

exports.getHashForUser = (email, callback) => {
    sqlController.execute(`select user_id, password_hash from user where email = "${email}"`, function(err, result)
    {
        if(result.rows.length == 1)
        {        
            callback(err, result.rows[0])
        } 
        else if(result.rows.length > 1)
        {
            callback(true, undefined)
        }
        else
        {
            callback(err, undefined)
        }
    })
}

exports.getGreenhousesForUser = (user_id, callback) => {
    sqlController.execute(`select greenhouse_id from greenhouse where user_id = "${user_id}"`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result.rows)
    })
}

exports.createGreenhouseForUser = (name, user_id, callback) => {
    sqlController.execute(`insert into greenhouse (name, user_id) values ("${name}", ${user_id});`, function(err, result) {
        if(!err)
        {
            sqlController.execute(`SELECT LAST_INSERT_ID()`, function(err, result){
                if(err)
                {
                    console.log(result)
                }
                callback(err, result.rows[0])
            })
        } 
        else {
            callback(err, result)
        }
    })
}

exports.deleteGreenhouseForUser = (greenhouse_id, user_id, callback) => {
    sqlController.execute(`delete from greenhouse where user_id = ${user_id} and greenhouse_id = ${greenhouse_id}`, function(err, result) {
        if(err)
        {
            console.log(result)
        } 
        else {
            callback(err, result)
        }
    })
}

exports.createEmptyTierForNewGreenhouse = (greenhouse_id, tier, user_id, callback) => {
    sqlController.execute(`insert into tiers (tier, greenhouse_id, user_id) VALUES (${tier}, ${greenhouse_id}, ${user_id});`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.deleteTiersForGreenhouse = (greenhouse_id, user_id, callback) => {
    sqlController.execute(`delete from tiers where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.getUserForToken = (token, callback) => {
    sqlController.execute(`select user_id from active_sessions where expiration_date > NOW() and token = "${token}";`, function(err, result) {
        if(result.rows.length == 1)
        {
            callback(err, result.rows[0])
        }
        else if(result.rows.length > 1)
        {
            callback(true, undefined)
        }
        else
        {
            callback(err, undefined)
        }
    })
}

exports.getTierForGreenhouse = (greenhouse_id, tier, user_id, callback) => {
    sqlController.execute(`SELECT tier, growth_stage, plant_id, ph_level, ec_level, water_level, cycle_time, num_plants FROM tiers where greenhouse_id = ${greenhouse_id} and user_id = ${user_id} and tier = ${tier}`, function(err, result) {
        if(result.rows.length == 1)
        {
            callback(err, result.rows[0])
        }
        else
        {
            if(err)
            {
                console.log(err)
            }
            callback(true, undefined)
        }
    })
}

exports.createUser = (email, password_hash, callback) => {
    sqlController.execute(`insert into user (email, password_hash) VALUES ("${email}", '${password_hash}')`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.revokeTokens = (user_id, callback) => {
    sqlController.execute(`DELETE FROM active_sessions WHERE (user_id = '${user_id}')`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.getGreenhouseForUser = (user_id, greenhouse_id, callback) => {
    sqlController.execute(`select name, water_level, nutrient_level, battery, light_level, power_source, seedling_time from greenhouse where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {
        if(result.rows.length == 1)
        {
            callback(err, result.rows[0])
        }
        else
        {
            if(err)
            {
                console.log(err)
            }
            callback(true, undefined)
        }
    })
}

exports.updateUserHash = (user_id, password_hash, callback) => {
    sqlController.execute(`UPDATE user SET password_hash = '${password_hash}' WHERE (user_id = '${user_id}')`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.insertTokenForUser = (token, user_id, expiration, callback) => {
    sqlController.execute(`insert into active_sessions (token, expiration_date, user_id) VALUES ('${token}', '${expiration}', ${user_id})`, function(err, result){
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.getExpirationDateString = () => {
    var date = new Date(new Date().getTime() + 30*60000)
    console.log(date.getMonth())
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds()
}