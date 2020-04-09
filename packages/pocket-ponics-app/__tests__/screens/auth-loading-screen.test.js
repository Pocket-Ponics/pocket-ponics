import React from 'react'
import { shallow } from 'enzyme'
import AuthUtil from '../../util/auth-util'

import AuthLoadingScreen from '../../screens/auth-loading-screen'

jest.mock('../../util/auth-util')
jest.mock('expo-permissions')

describe('Auth Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<AuthLoadingScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})

	test('navigates to new pages', () => {
		const navigation = {
			navigate: jest.fn()
		}

		AuthUtil.getAuthToken.mockImplementation((fn1, fn2) => {
			fn1()
			fn2()
		})

		shallow(
			<AuthLoadingScreen navigation={navigation}/>
		)

		expect(navigation.navigate).toHaveBeenCalledTimes(2)
	})
})