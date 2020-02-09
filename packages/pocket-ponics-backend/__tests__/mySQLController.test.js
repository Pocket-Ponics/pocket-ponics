import mySQLController from '../controllers/mySQLController'

import mySQLConnector from '../db/mySQLConnector'
jest.mock('../db/mySQLConnector')


var mysql = require('mysql')

describe('MySQL Controller', () => {

	test ('getHashForUser', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn(false, {
				rows: ['mock_row']
			})
			return string
		})

		const callback = jest.fn()
		mySQLConnector.getHashForUser('mock_email', callback)

		expect()
	})
	// getGreenhouseForUser
	// addDeviceKeyForUser
	// deleteDeviceKeyForUser
	// getAllPlantIdeals
	// getGreenhouseHistoricalData
	// deletePlantIdeal
	// updateReadingsForGreenhouse
	// updateReadingsForSensorType
	// createUser
	// revokeTokens
	// revokeDeviceKeys

	test ('revokeDeviceKeys deletes successfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLConnector.revokeDeviceKeys(callback)

		expect(mySQLConnector.execute)
			.toHaveBeenCalledWith()
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

	test ('getReadySeedlings joins unsuccessfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn('mock_error', 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadySeedlings(callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith('mock_error', 'unsuccessful')
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
			fn('mock_error', 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.getReadyTiers(callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith('mock_error', 'unsuccessful')
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
				'UPDATE user SET password_hash = "mock_password_hash" WHERE (user_id = mock_user_id)',
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test ('updateUserHash updates unsuccessfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn('mock_error', 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.updateUserHash('mock_user_id', 'mock_password_hash', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith('mock_error', 'unsuccessful')
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
				'insert into active_sessions (token, expiration_date, user_id) VALUES ("mock_token", "mock_expiration", mock_user_id)', 
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test('insertTokenForUser inserts unsuccessfully', () => {
		mySQLConnector.execute.mockImplementation((string, fn) => {
			fn('mock_error', 'unsuccessful')
			return string
		})

		const callback = jest.fn()
		mySQLController.insertTokenForUser('mock_token', 'mock_user_id','mock_expiration', callback)

		expect(mySQLConnector.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith('mock_error', 'unsuccessful')
	})

	test('Testing expiration date format', () => {
		expect(mySQLController.getExpirationDateString()).toEqual(expect.any(String))
	})
})