import React from 'react'
import { shallow } from 'enzyme'

import WifiScreen from '../../screens/wifi-screen'

describe('Wifi Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<WifiScreen navigation={{ getParam: jest.fn() }}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
})