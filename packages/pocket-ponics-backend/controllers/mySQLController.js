var mysql = require('mysql')
var sqlController = require('../db/mySQLConnector')

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

exports.getHashForSensorGrid = (serial_no, callback) => {
	sqlController.execute(`select user_id, greenhouse_id, password_hash from sensor_grid where serial_no = "${serial_no}"`, function(err, result)
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

exports.addDeviceKeyForUser = (user_id, deviceKey, callback) => {
	sqlController.execute(`insert into devices (user_id, device_key) values (${user_id},'${deviceKey}');`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.deleteDeviceKeyForUser = (user_id, deviceKey, callback) => {
	sqlController.execute(`delete from devices where user_id = ${user_id} and device_key = '${deviceKey}';`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.getAllPlantIdeals = (callback) => {
	sqlController.execute("select * from plant_ideal", function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.createGreenhouseForUser = (name, seedling_time, user_id, callback) => {
	sqlController.execute(`insert into greenhouse (name, seedling_time, user_id) values ("${name}", "${seedling_time}", ${user_id});`, function(err, result) {
		if(!err)
		{
			callback(err, result.rows.insertId)
		} 
		else {
			console.log(result)
			callback(err, result)
		}
	})
}

exports.deleteGreenhouseForUser = (greenhouse_id, user_id, callback) => {
	var tierQuery = `DELETE from tiers where greenhouse_id = ${greenhouse_id} and user_id = ${user_id};`
	var historicalQuery = `DELETE from historical_data where greenhouse_id = ${greenhouse_id} and user_id = ${user_id};`
	var sensorGridQuery = `DELETE from sensor_grid where greenhouse_id = ${greenhouse_id} and user_id = ${user_id};`
	var greenhouseQuery = `DELETE from greenhouse where user_id = ${user_id} and greenhouse_id = ${greenhouse_id};`

	sqlController.execute(`SELECT * from greenhouse where user_id = ${user_id} and greenhouse_id = ${greenhouse_id}`, function(err, result){
		if(err)
		{
			console.log(result)
			callback(err, result)
		}
		else if(result.rows.length == 1) 
		{
			sqlController.executeTransaction([tierQuery, historicalQuery, sensorGridQuery, greenhouseQuery], function(err, result) {
				if(err)
				{
					console.log(result)
				} 
				callback(err, result)
			})
		} 
		else 
		{
			callback(true, result)
		}
	})
}

exports.createEmptyTiersAndGridForNewGreenhouse = (greenhouse_id, user_id, serial_no, grid_hash, callback) => {
	var tier1Query = `insert into tiers (tier, greenhouse_id, user_id) VALUES (1, ${greenhouse_id}, ${user_id});`
	var tier2Query = `insert into tiers (tier, greenhouse_id, user_id) VALUES (2, ${greenhouse_id}, ${user_id});`
	var tier3Query = `insert into tiers (tier, greenhouse_id, user_id) VALUES (3, ${greenhouse_id}, ${user_id});`
	var tier4Query = `insert into tiers (tier, greenhouse_id, user_id) VALUES (4, ${greenhouse_id}, ${user_id});`
	var gridQuery = `insert into sensor_grid (serial_no, password_hash, user_id, greenhouse_id) VALUES ('${serial_no}', '${grid_hash}', ${user_id}, ${greenhouse_id});`

	sqlController.executeTransaction([tier1Query, tier2Query, tier3Query, tier4Query, gridQuery], function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.getGreenhouseHistoricalData = (user_id, greenhouse_id, lower_limit, upper_limit, callback) => {
	sqlController.execute(`select * from historical_data where user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and date >= '${lower_limit}' and date < '${upper_limit}'`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result.rows)
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

exports.createPlantIdeal = (ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time, callback) => {
	sqlController.execute(`insert into plant_ideal (ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time) values (${ph_level_low}, ${ec_level_low}, ${temp_low}, ${cycle_time}, ${ph_level_high}, ${ec_level_high}, ${temp_high}, "${name}", ${light_time});`, function(err, result) {
		if(!err)
		{
			callback(err, result.rows.insertId)
		} 
		else {
			console.log(result)
			callback(err, result)
		}
	})
}

exports.updatePlantIdeal = (plant_id, ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time, callback) => {
	sqlController.execute(`UPDATE plant_ideal SET ph_level_low = ${ph_level_low}, ec_level_low = ${ec_level_low}, temp_low = ${temp_low}, cycle_time = ${cycle_time}, ph_level_high = ${ph_level_high}, ec_level_high = ${ec_level_high}, temp_high = ${temp_high}, name = "${name}", light_time = ${light_time} where plant_id = ${plant_id}`, function(err, result) {        
		if(err || result.rows.affectedRows == 1)
		{
			callback(err, result)
		}
		else
		{
			callback(true, result)
		}
	})
}

exports.deletePlantIdeal = (plant_id, callback) => {
	sqlController.execute(`DELETE FROM plant_ideal WHERE (plant_id = ${plant_id})`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.getRoleForUser = (user_id, callback) => {
	sqlController.execute(`select admin from user where user_id = ${user_id}`, function(err, result) {
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

exports.updateTierForGreenhouse = (user_id, greenhouse_id, tier, plant_id, cycle_time, num_plants, light_start, callback) => {
	sqlController.execute(`UPDATE tiers SET plant_id = ${plant_id}, cycle_time = "${cycle_time}", num_plants = ${num_plants}, light_start = ${light_start} WHERE user_id = ${user_id} and tier = ${tier} and greenhouse_id = ${greenhouse_id}`, function(err, result) {
		if(err || result.rows.affectedRows == 1)
		{
			callback(err, result)
		}
		else
		{
			callback(true, result)
		}
	})
}

exports.updateGreenhouseForUser = (user_id, greenhouse_id, name, seedling_time, callback) => {
	sqlController.execute(`UPDATE greenhouse SET name = "${name}", seedling_time = "${seedling_time}" WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id}`, function(err, result) {
		if(err || result.rows.affectedRows == 1)
		{
			callback(err, result)
		}
		else
		{
			callback(true, result)
		}
	})
}

exports.updateReadingsForGreenhouse = (user_id, greenhouse_id, water_level, nutrient_level, battery, power_source, light_level, tier1, tier2, tier3, tier4, callback) => {

	var greenhouseUpdate = `UPDATE greenhouse SET water_level = ${water_level}, nutrient_level = ${nutrient_level}, battery = ${battery}, power_source = ${power_source}, light_level = ${light_level} WHERE (user_id = ${user_id} and greenhouse_id = ${greenhouse_id});`
	var tier1Update = `UPDATE tiers SET water_level = ${tier1.water_level}, ph_level = ${tier1.ph_level}, ec_level = ${tier1.ec_level} where (user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = 1);`
	var tier2Update = `UPDATE tiers SET water_level = ${tier2.water_level}, ph_level = ${tier2.ph_level}, ec_level = ${tier2.ec_level} where (user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = 2);`
	var tier3Update = `UPDATE tiers SET water_level = ${tier3.water_level}, ph_level = ${tier3.ph_level}, ec_level = ${tier3.ec_level} where (user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = 3);`
	var tier4Update = `UPDATE tiers SET water_level = ${tier4.water_level}, ph_level = ${tier4.ph_level}, ec_level = ${tier4.ec_level} where (user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = 4);`
	var greenhouseUpdateHistory = `INSERT into historical_data (date, water_level, nutrient_level, battery, power_source, greenhouse_id, user_id, light_level) VALUES (NOW(), ${water_level}, ${nutrient_level}, ${battery}, ${power_source}, ${greenhouse_id}, ${user_id}, ${light_level});`

	sqlController.executeTransaction([greenhouseUpdate, tier1Update, tier2Update, tier3Update, tier4Update, greenhouseUpdateHistory], function(err, result){
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.updateReadingsForGreenhouseTier = (user_id, greenhouse_id, tier, water_level, ph_level, ec_level, callback) => {
	sqlController.execute(`UPDATE tiers SET water_level = ${water_level}, ph_level = ${ph_level}, ec_level = ${ec_level} WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = ${tier}`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.updatePowerSourceForGreenhouse = (user_id, greenhouse_id, power_source, callback) => {
	sqlController.execute(`select * from greenhouse where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {

		if(result.rows.length == 1)
		{        
			var water_level = result.rows[0].water_level
			var nutrient_level = result.rows[0].nutrient_level
			var light_level = result.rows[0].light_level
			var battery = result.rows[0].battery

			var greenhouseQuery = `UPDATE greenhouse SET power_source = ${power_source} WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id};`
			var greenhouseHistoryQuery = `INSERT into historical_data (date, water_level, nutrient_level, light_level, battery, power_source, greenhouse_id, user_id) values (NOW(), ${water_level}, ${nutrient_level}, ${light_level}, ${battery}, ${power_source}, ${greenhouse_id}, ${user_id});`

			sqlController.executeTransaction([greenhouseQuery, greenhouseHistoryQuery], function(err, result) {
				if(err)
				{
					console.log(result)
				}
				callback(err, result)
			})
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

exports.updateBatteryForGreenhouse = (user_id, greenhouse_id, battery, callback) => {
	sqlController.execute(`select * from greenhouse where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {
		if(result.rows.length == 1)
		{        
			var water_level = result.rows[0].water_level
			var nutrient_level = result.rows[0].nutrient_level
			var light_level = result.rows[0].light_level
			var power_source = result.rows[0].power_source

			var greenhouseQuery = `UPDATE greenhouse SET battery = ${battery} WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id};`
			var greenhouseHistoryQuery = `INSERT into historical_data (date, water_level, nutrient_level, light_level, battery, power_source, greenhouse_id, user_id) values (NOW(), ${water_level}, ${nutrient_level}, ${light_level}, ${battery}, ${power_source}, ${greenhouse_id}, ${user_id});`

			sqlController.executeTransaction([greenhouseQuery, greenhouseHistoryQuery], function(err, result) {
				if(err)
				{
					console.log(result)
				}
				callback(err, result)
			})
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

exports.updateReadingsForSensorType = (user_id, greenhouse_id, tier, sensor_name, reading, callback) => {
	sqlController.execute(`UPDATE tiers SET ${sensor_name} = ${reading} WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = ${tier}`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.getReadingForSensors = (user_id, greenhouse_id, tier, callback) => {
	sqlController.execute(`select ph_level, ec_level, water_level from tiers WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = ${tier}`, function(err, result) {
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

exports.getReadingsForGreenhouse = (user_id, greenhouse_id, callback) => {
	sqlController.execute(`select ph_level, ec_level, water_level, tier from tiers WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id}`, function(err, result) {
		if(result.rows.length == 4)
		{
			callback(err, result.rows)
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

exports.getTierForGreenhouse = (greenhouse_id, tier, user_id, callback) => {
	sqlController.execute(`SELECT tier, plant_id, ph_level, ec_level, water_level, cycle_time, num_plants, light_start FROM tiers where greenhouse_id = ${greenhouse_id} and user_id = ${user_id} and tier = ${tier}`, function(err, result) {
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
	sqlController.execute(`DELETE FROM active_sessions WHERE (user_id = ${user_id})`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.revokeDeviceKeys = (user_id, callback) => {
	sqlController.execute(`DELETE FROM devices WHERE user_id = ${user_id}`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.getReadySeedlings = (callback) => {
	sqlController.execute(`SELECT DISTINCT greenhouse.user_id, greenhouse.greenhouse_id, devices.device_key FROM pocketponics.greenhouse LEFT JOIN devices ON greenhouse.user_id=devices.user_id where seedling_time = CURDATE()`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.getReadyTiers = (callback) => {
	sqlController.execute(`SELECT DISTINCT tiers.user_id, tiers.tier, tiers.greenhouse_id, devices.device_key FROM pocketponics.tiers LEFT JOIN devices ON tiers.user_id=devices.user_id where cycle_time = CURDATE()`, function(err, result) {
		if(err)
		{
			console.log(result)
		}
		callback(err, result)
	})
}

exports.getDevicesForUser = (user_id, callback) => {
	
}

exports.revokeTokensAndDeviceKeys = (user_id, callback) => {
	var devicekeyQuery = `DELETE FROM devices WHERE user_id = ${user_id};`
	var tokenQuery = `DELETE FROM active_sessions WHERE (user_id = ${user_id});`

	sqlController.executeTransaction([devicekeyQuery, tokenQuery], function(err, result) {
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

exports.getPlantIdealData = (callback) => {
	sqlController.execute('SELECT `cycle_time`, `light_time`, `ec_level_high`, `ec_level_low`, `name`, `ph_level_high`, `ph_level_low`, `plant_id`, `temp_high`, `temp_low` FROM `plant_ideal`', function(err, result) {
		if(!err)
		{
			callback(err, result)
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

exports.getTiersAndIdeal = (user_id, greenhouse_id, callback) => {
	sqlController.execute(`SELECT tiers.user_id, tiers.tier, tiers.greenhouse_id, tiers.plant_id, tiers.light_start, plant_ideal.ph_level_high, plant_ideal.ph_level_low, plant_ideal.ec_level_high, plant_ideal.ec_level_low, plant_ideal.light_time FROM pocketponics.tiers LEFT JOIN plant_ideal ON tiers.plant_id=plant_ideal.plant_id where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {
		if(!err)
		{
			callback(err, result)
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

exports.getGreenhouseDetail = (user_id, greenhouse_id, callback) => {
	sqlController.execute(`select greenhouse_id, name, water_level, nutrient_level, battery, light_level, power_source, seedling_time from greenhouse where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {
		if(result.rows.length == 1)
		{
			var greenhouseData = result.rows[0]

			sqlController.execute(`SELECT tier, plant_id, ph_level, ec_level, water_level, cycle_time, light_start, num_plants FROM tiers where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {
				if(result.rows.length == 4)
				{
					greenhouseData.tiers = result.rows
					callback(err, greenhouseData)
				}
				else
				{
					console.log(err)
					callback(true, undefined)
				}
			})
		}
		else
		{
			console.log(err)
			callback(true, undefined)
		}
	})
}

exports.updateUserHash = (user_id, password_hash, callback) => {
	sqlController.execute(`UPDATE user SET password_hash = '${password_hash}' WHERE (user_id = ${user_id})`, function(err, result) {
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