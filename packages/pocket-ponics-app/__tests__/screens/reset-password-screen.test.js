import React from 'react'
import { shallow } from 'enzyme'

import ResetPasswordScreen from '../../screens/reset-password-screen'

describe('Reset Password Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<ResetPasswordScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})