import { execute } from '../controllers/mySQLController';

var mysql = require('mysql');

describe('MySQL Controller', () => {
	test('Execute query successfully', done => {
		expect(() => execute('select * from user', done)).not.toThrow();
	})

	test('Execute query unsuccessful', done => {
		expect(() => execute('select * from fakeTable', done)).toThrow();
	})
});
