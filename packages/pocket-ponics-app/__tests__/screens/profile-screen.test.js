import React from 'react'
import { shallow } from 'enzyme'

import ProfileScreen from '../../screens/profile-screen'

describe('Profile Screen', () => {
	test('renders correctly', () => {
		global.greenhouses = {}
		const tree = shallow(
			<ProfileScreen  navigation={{ getParam: jest.fn() }}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
})