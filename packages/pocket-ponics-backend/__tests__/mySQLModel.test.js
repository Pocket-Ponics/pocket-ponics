import mySQLModel from '../models/mySQLModel';

import mySQLController from '../controllers/mySQLController';
jest.mock('../controllers/mySQLController')

describe.only('MySQLModel', () => {
	test('insertTokenForUser inserts successfully ', () => {
		mySQLController.execute.mockImplementation((string, fn) => {
			fn()
			return string
		})

		const callback = jest.fn()
		mySQLModel.insertTokenForUser("mock_token", "mock_user_id","mock_expiration", callback)

		expect(mySQLController.execute)
			.toHaveBeenCalledWith(
				"insert into active_sessions (token, expiration_date, user_id) VALUES ('mock_token', 'mock_expiration', mock_user_id)", 
				expect.any(Function))
		expect(callback).toHaveBeenCalled()
	})

	test('insertTokenForUser inserts unsuccessfully ', () => {
		mySQLController.execute.mockImplementation((string, fn) => {
			fn('mockError', 'unsucessful')
			return string
		})

		const callback = jest.fn()
		mySQLModel.insertTokenForUser("mock_token", "mock_user_id","mock_expiration", callback)

		expect(mySQLController.execute).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith('mockError', 'unsucessful')
	})

	test('Testing expiration date format', () => {
		expect(mySQLModel.getExpirationDateString()).toEqual(expect.any(String))
	});
});


