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

	test ('getHashForUser returns unsuccessfully', () => {
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

	test ('getHashForSensorGrid returns unsuccessfully', () => {
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

	test ('getGreenhousesForUser selects unsuccessfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, {
				rows: ['unsuccessful']
			})
			return string
		})

		const callback = jest.fn()
		mySQLController.getGreenhousesForUser('mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, ['unsuccessful'])
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

	test ('addDeviceKeyForUser inserts unsuccessfully', () => {
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

	 test ('deleteDeviceKeyForUser deletes unsuccessfully', () => {
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

	test ('getAllPlantIdeals selects unsuccessfully', () => {
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

	test ('createGreenhouseForUser selects unsuccessfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.createGreenhouseForUser('mock_name', 'mock_time', 'mock_user_id', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	// test ('revokeDeviceKeys deletes successfully', () => {
	// 	mySQLConnector.execute.mockImplementation((string, fn) => {
	// 		fn()
	// 		return string
	// 	})

	// 	const callback = jest.fn()
	// 	mySQLController.revokeDeviceKeys('mock_user_id', callback)

	// 	expect(mySQLConnector.execute)
	// 		.toHaveBeenCalledWith()
	// })

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

	test ('getReadySeedlings joins unsuccessfully', () => {
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

	test ('getReadyTiers joins unsuccessfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadyTiers(callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	// test ('updateUserHash updates successfully', () => {
	// 	mySQLConnector.execute.mockImplementation((string, fn) => {
	// 		fn()
	// 		return string
	// 	})

	// 	const callback = jest.fn()
	// 	mySQLController.updateUserHash('mock_user_id', 'mock_password_hash', callback)

	// 	expect(mySQLConnector.execute)
	// 		.toHaveBeenCalledWith(
	// 			'UPDATE user SET password_hash = "mock_password_hash" WHERE (user_id = mock_user_id)',
	// 			expect.any(Function))
	// 	expect(callback).toHaveBeenCalled()
	// })

	test ('updateUserHash updates unsuccessfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(true, 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.updateUserHash('mock_user_id', 'mock_password_hash', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true, 'unsuccessful')
	})

	// test('insertTokenForUser inserts successfully ', () => {
	// 	mySQLConnector.execute.mockImplementation((string, fn) => {
	// 		fn()
	// 		return string
	// 	})

	// 	const callback = jest.fn()
	// 	mySQLController.insertTokenForUser('mock_token', 'mock_user_id','mock_expiration', callback)

	// 	expect(mySQLConnector.execute)
	// 		.toHaveBeenCalledWith(
	// 			'insert into active_sessions (token, expiration_date, user_id) VALUES ("mock_token", "mock_expiration", mock_user_id)',
	// 			expect.any(Function))
	// 	expect(callback).toHaveBeenCalled()
	// })

	test('insertTokenForUser inserts unsuccessfully', () => {
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
