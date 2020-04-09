import React from 'react'
import { shallow } from 'enzyme'

import NetworkConnectionScreen from '../../screens/network-connection-screen'

describe('Network Connection Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<NetworkConnectionScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})