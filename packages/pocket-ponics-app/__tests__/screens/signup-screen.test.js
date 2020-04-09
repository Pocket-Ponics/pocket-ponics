import React from 'react'
import { shallow } from 'enzyme'

import SignUpScreen from '../../screens/signup-screen'

describe('Sign Up Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<SignUpScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})