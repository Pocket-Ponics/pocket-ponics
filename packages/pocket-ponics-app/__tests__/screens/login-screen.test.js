import React from 'react'
import { shallow } from 'enzyme'

import LoginScreen from '../../screens/login-screen'

describe('Login Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<LoginScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})