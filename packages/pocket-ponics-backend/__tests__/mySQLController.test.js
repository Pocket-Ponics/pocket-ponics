import mySQLController from '../controllers/mySQLController'

import mySQLConnector from '../db/mySQLConnector'
jest.mock('../db/mySQLConnector')


var mysql = require('mysql')

describe('MySQL Controller', () => {

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test ('getHashForUser selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getHashForUser('mock_email', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select user_id, password_hash from user where email = "mock_email"',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getHashForUser returns too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getHashForUser('mock_email', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getHashForUser has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getHashForUser('mock_email', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getHashForSensorGrid returns successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getHashForSensorGrid('mock_serial_no', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select user_id, greenhouse_id, password_hash from sensor_grid where serial_no = "mock_serial_no"',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getHashForSensorGrid returns too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getHashForSensorGrid('mock_serial_no', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getHashForSensorGrid has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getHashForSensorGrid('mock_serial_no', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getGreenhousesForUser selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getGreenhousesForUser('mock_user_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select greenhouse_id from greenhouse where user_id = "mock_user_id"',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getGreenhousesForUser has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getGreenhousesForUser('mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, [])
	})

	test ('addDeviceKeyForUser inserts successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.addDeviceKeyForUser('mock_user_id', 'mock_device_key', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				`insert into devices (user_id, device_key) values (mock_user_id,'mock_device_key');`,
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('addDeviceKeyForUser has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.addDeviceKeyForUser('mock_user_id', 'mock_device_key', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	 test ('deleteDeviceKeyForUser deletes successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.deleteDeviceKeyForUser('mock_user_id', 'mock_device_key', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				`delete from devices where user_id = mock_user_id and device_key = 'mock_device_key';`,
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	 test ('deleteDeviceKeyForUser has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.deleteDeviceKeyForUser('mock_user_id', 'mock_device_key', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('getAllPlantIdeals selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.getAllPlantIdeals(callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select * from plant_ideal', expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getAllPlantIdeals has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.getAllPlantIdeals(callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('createGreenhouseForUser inserts successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_inserted_id']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.createGreenhouseForUser('mock_name', 'mock_seedling_time', 'mock_user_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'insert into greenhouse (name, seedling_time, user_id) values ("mock_name", "mock_seedling_time", mock_user_id);',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('createGreenhouseForUser has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.createGreenhouseForUser('mock_name', 'mock_time', 'mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('getGreenhouseHistoricalData selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getGreenhouseHistoricalData('mock_user_id', 'mock_greenhouse_id', 'mock_lower_limit', 'mock_upper_limit', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				`select * from historical_data where user_id = mock_user_id and greenhouse_id = mock_greenhouse_id and date >= 'mock_lower_limit' and date < 'mock_upper_limit'`,
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getGreenhouseHistoricalData has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getGreenhouseHistoricalData('mock_user_id', 'mock_greenhouse_id', 'mock_lower_limit', 'mock_upper_limit', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, [])
	})

	test ('getUserForToken selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getUserForToken('mock_token', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select user_id from active_sessions where expiration_date > NOW() and token = \"mock_token\";',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getUserForToken selects too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getUserForToken('mock_token', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getUserForToken has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getUserForToken('mock_token', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('createPlantIdeal creates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_inserted_id']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.createPlantIdeal('mock_ph_level_low', 'mock_ec_level_low', 'mock_temp_low', 'mock_cycle_time', 'mock_ph_level_high', 'mock_ec_level_high', 'mock_temp_high', 'mock_name', 'mock_light_time', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'insert into plant_ideal (ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time) values (mock_ph_level_low, mock_ec_level_low, mock_temp_low, mock_cycle_time, mock_ph_level_high, mock_ec_level_high, mock_temp_high, "mock_name", mock_light_time);',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('createPlantIdeal has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.createPlantIdeal('mock_ph_level_low', 'mock_ec_level_low', 'mock_temp_low', 'mock_cycle_time', 'mock_ph_level_high', 'mock_ec_level_high', 'mock_temp_high', 'mock_name', 'mock_light_time', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('updatePlantIdeal updates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: {
					affectedRows: 2
				}
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updatePlantIdeal('mock_plant_id', 'mock_ph_level_low', 'mock_ec_level_low', 'mock_temp_low', 'mock_cycle_time', 'mock_ph_level_high', 'mock_ec_level_high', 'mock_temp_high', 'mock_name', 'mock_light_time', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'UPDATE plant_ideal SET ph_level_low = mock_ph_level_low, ec_level_low = mock_ec_level_low, temp_low = mock_temp_low, cycle_time = mock_cycle_time, ph_level_high = mock_ph_level_high, ec_level_high = mock_ec_level_high, temp_high = mock_temp_high, name = "mock_name", light_time = mock_light_time where plant_id = mock_plant_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('updatePlantIdeal updates one row', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: {
					affectedRows: 1
				}
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updatePlantIdeal('mock_plant_id', 'mock_ph_level_low', 'mock_ec_level_low', 'mock_temp_low', 'mock_cycle_time', 'mock_ph_level_high', 'mock_ec_level_high', 'mock_temp_high', 'mock_name', 'mock_light_time', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(false, {rows: {affectedRows: 1}})
	})

	test ('updatePlantIdeal has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.updatePlantIdeal('mock_plant_id', 'mock_ph_level_low', 'mock_ec_level_low', 'mock_temp_low', 'mock_cycle_time', 'mock_ph_level_high', 'mock_ec_level_high', 'mock_temp_high', 'mock_name', 'mock_light_time', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test('deletePlantIdeal deletes successfully ', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.deletePlantIdeal('mock_plant_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'DELETE FROM plant_ideal WHERE (plant_id = mock_plant_id)',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('deletePlantIdeal fails', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.deletePlantIdeal('mock_plant_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test('getRoleForUser selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getRoleForUser('mock_user_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith('select admin from user where user_id = mock_user_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test('getRoleForUser selects too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getRoleForUser('mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test('getRoleForUser fails', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getRoleForUser('mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('updateTierForGreenhouse updates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: {
					affectedRows: 2
				}
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updateTierForGreenhouse('mock_user_id', 'mock_greenhouse_id', 'mock_tier', 'mock_plant_id', 'mock_cycle_time', 'mock_num_plants', 'mock_light_start', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'UPDATE tiers SET plant_id = mock_plant_id, cycle_time = "mock_cycle_time", num_plants = mock_num_plants, light_start = mock_light_start WHERE user_id = mock_user_id and tier = mock_tier and greenhouse_id = mock_greenhouse_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('updateTierForGreenhouse updates one row', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: {
					affectedRows: 1
				}
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updateTierForGreenhouse('mock_user_id', 'mock_greenhouse_id', 'mock_tier', 'mock_plant_id', 'mock_cycle_time', 'mock_num_plants', 'mock_light_start', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(false, {rows: {affectedRows: 1}})
	})

	test ('updateTierForGreenhouse fails', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.updateTierForGreenhouse('mock_user_id', 'mock_greenhouse_id', 'mock_tier', 'mock_plant_id', 'mock_cycle_time', 'mock_num_plants', 'mock_light_start', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('updateGreenhouseForUser updates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: {
					affectedRows: 2
				}
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updateGreenhouseForUser('mock_user_id', 'mock_greenhouse_id', 'mock_name', 'mock_seedling_time', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'UPDATE greenhouse SET name = "mock_name", seedling_time = "mock_seedling_time" WHERE user_id = mock_user_id and greenhouse_id = mock_greenhouse_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('updateGreenhouseForUser updates one row', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: {
					affectedRows: 1
				}
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updateGreenhouseForUser('mock_user_id', 'mock_greenhouse_id', 'mock_name', 'mock_seedling_time', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(false, {rows: {affectedRows: 1}})
	})

	test ('updateGreenhouseForUser fails', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.updateGreenhouseForUser('mock_user_id', 'mock_greenhouse_id', 'mock_name', 'mock_seedling_time', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	// test ('updateGreenhouseForUser updates successfully', () => {
	// 	mySQLConnector.executeTransaction.mockImplementation((string, fn) => {
	// 		fn()
	// 		return string
	// 	})

	// 	const callback = jest.fn()
	// 	mySQLController.updateGreenhouseForUser('mock_user_id', 'mock_greenhouse_id', 'mock_name', 'mock_seedling_time', callback)

	// 	expect(mySQLConnector.execute)
	// 		.toHaveBeenCalledWith(
	// 			'UPDATE greenhouse SET name = "mock_name", seedling_time = "mock_seedling_time" WHERE user_id = mock_user_id and greenhouse_id = mock_greenhouse_id',
	// 			expect.any(Function))
	// 	expect(callback).toHaveBeenCalled()
	// })

	test ('updateReadingsForGreenhouseTier updates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.updateReadingsForGreenhouseTier('mock_user_id', 'mock_greenhouse_id', 'mock_tier', 'mock_water_level', 'mock_ph_level', 'mock_ec_level', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'UPDATE tiers SET water_level = mock_water_level, ph_level = mock_ph_level, ec_level = mock_ec_level WHERE user_id = mock_user_id and greenhouse_id = mock_greenhouse_id and tier = mock_tier',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('updateReadingsForGreenhouseTier updates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.updateReadingsForGreenhouseTier('mock_user_id', 'mock_greenhouse_id', 'mock_tier', 'mock_water_level', 'mock_ph_level', 'mock_ec_level', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('updatePowerSourceForGreenhouse updates too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updatePowerSourceForGreenhouse('mock_user_id', 'mock_greenhouse_id', 'mock_power_source', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select * from greenhouse where greenhouse_id = mock_greenhouse_id and user_id = mock_user_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('updatePowerSourceForGreenhouse fails', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updatePowerSourceForGreenhouse('mock_user_id', 'mock_greenhouse_id', 'mock_power_source', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('updateBatteryForGreenhouse updates too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updateBatteryForGreenhouse('mock_user_id', 'mock_greenhouse_id', 'mock_battery', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select * from greenhouse where greenhouse_id = mock_greenhouse_id and user_id = mock_user_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('updateBatteryForGreenhouse fails', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.updateBatteryForGreenhouse('mock_user_id', 'mock_greenhouse_id', 'mock_battery', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('updateReadingsForSensorType updates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.updateReadingsForSensorType('mock_user_id', 'mock_greenhouse_id', 'mock_tier', 'mock_sensor_name', 'mock_reading', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'UPDATE tiers SET mock_sensor_name = mock_reading WHERE user_id = mock_user_id and greenhouse_id = mock_greenhouse_id and tier = mock_tier',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('updateReadingsForSensorType updates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.updateReadingsForSensorType('mock_user_id', 'mock_greenhouse_id', 'mock_tier', 'mock_sensor_name', 'mock_reading', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('getReadingForSensors selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadingForSensors('mock_user_id', 'mock_greenhouse_id', 'mock_tier', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select ph_level, ec_level, water_level from tiers WHERE user_id = mock_user_id and greenhouse_id = mock_greenhouse_id and tier = mock_tier',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getReadingForSensors selects too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadingForSensors('mock_user_id', 'mock_greenhouse_id', 'mock_tier', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getReadingForSensors has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadingForSensors('mock_user_id', 'mock_greenhouse_id', 'mock_tier', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getReadingsForGreenhouse selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row', 'mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadingsForGreenhouse('mock_user_id', 'mock_greenhouse_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select ph_level, ec_level, water_level, tier from tiers WHERE user_id = mock_user_id and greenhouse_id = mock_greenhouse_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getReadingsForGreenhouse has unexpected result length', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadingsForGreenhouse('mock_user_id', 'mock_greenhouse_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getReadingsForGreenhouse has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadingsForGreenhouse('mock_user_id', 'mock_greenhouse_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getTierForGreenhouse selects successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getTierForGreenhouse('mock_greenhouse_id', 'mock_tier','mock_user_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'SELECT tier, plant_id, ph_level, ec_level, water_level, cycle_time, num_plants, light_start FROM tiers where greenhouse_id = mock_greenhouse_id and user_id = mock_user_id and tier = mock_tier',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getTierForGreenhouse selects too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getTierForGreenhouse('mock_greenhouse_id', 'mock_tier','mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getTierForGreenhouse fails', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getTierForGreenhouse('mock_greenhouse_id', 'mock_tier','mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('createUser inserts new user successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.createUser('mock_email', 'mock_password_hash', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'insert into user (email, password_hash) VALUES ("mock_email", \'mock_password_hash\')',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('createUser fails to insert', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.createUser('mock_email', 'mock_password_hash', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('revokeTokens deletes token successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.revokeTokens('mock_user_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'DELETE FROM active_sessions WHERE (user_id = mock_user_id)',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('revokeTokens fails to delete', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.revokeTokens('mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('revokeDeviceKeys deletes key successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.revokeDeviceKeys('mock_user_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'DELETE FROM devices WHERE user_id = mock_user_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('revokeDeviceKeys has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.revokeDeviceKeys('mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('getReadySeedlings joins successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadySeedlings(callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'SELECT DISTINCT greenhouse.user_id, greenhouse.greenhouse_id, devices.device_key FROM pocketponics.greenhouse LEFT JOIN devices ON greenhouse.user_id=devices.user_id where seedling_time = CURDATE()',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getReadySeedlings has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadySeedlings(callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('getReadyTiers joins successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadyTiers(callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'SELECT DISTINCT tiers.user_id, tiers.tier, tiers.greenhouse_id, devices.device_key FROM pocketponics.tiers LEFT JOIN devices ON tiers.user_id=devices.user_id where cycle_time = CURDATE()',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getReadyTiers has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadyTiers(callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test ('getGreenhouseForUser select successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getGreenhouseForUser('mock_user_id' ,'mock_greenhouse_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'select name, water_level, nutrient_level, battery, light_level, power_source, seedling_time from greenhouse where greenhouse_id = mock_greenhouse_id and user_id = mock_user_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getGreenhouseForUser selects too many rows', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row', 'mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getGreenhouseForUser('mock_user_id' ,'mock_greenhouse_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getGreenhouseForUser has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: []
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getGreenhouseForUser('mock_user_id' ,'mock_greenhouse_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getPlantIdealData select successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.getPlantIdealData(callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'SELECT `cycle_time`, `light_time`, `ec_level_high`, `ec_level_low`, `name`, `ph_level_high`, `ph_level_low`, `plant_id`, `temp_high`, `temp_low` FROM `plant_ideal`',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getPlantIdealData has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.getPlantIdealData(callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('getTiersAndIdeal select successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.getTiersAndIdeal('mock_user_id', 'mock_greenhouse_id', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				'SELECT tiers.user_id, tiers.tier, tiers.greenhouse_id, tiers.plant_id, tiers.light_start, plant_ideal.ph_level_high, plant_ideal.ph_level_low, plant_ideal.ec_level_high, plant_ideal.ec_level_low, plant_ideal.light_time FROM pocketponics.tiers LEFT JOIN plant_ideal ON tiers.plant_id=plant_ideal.plant_id where greenhouse_id = mock_greenhouse_id and user_id = mock_user_id',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('getTiersAndIdeal has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.getTiersAndIdeal('mock_user_id', 'mock_greenhouse_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, undefined)
	})

	test ('updateUserHash updates successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.updateUserHash('mock_user_id', 'mock_password_hash', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				"UPDATE user SET password_hash = 'mock_password_hash' WHERE (user_id = mock_user_id)",
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('updateUserHash has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.updateUserHash('mock_user_id', 'mock_password_hash', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test('insertTokenForUser inserts successfully ', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLController.insertTokenForUser('mock_token', 'mock_user_id','mock_expiration', callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith(
				"insert into active_sessions (token, expiration_date, user_id) VALUES ('mock_token', 'mock_expiration', mock_user_id)",
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test('insertTokenForUser has an error', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.insertTokenForUser('mock_token', 'mock_user_id','mock_expiration', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	test('Testing expiration date format', () => {
		expect(mySQLController.getExpirationDateString()).toEqual(expect.any(String))
	})
})
