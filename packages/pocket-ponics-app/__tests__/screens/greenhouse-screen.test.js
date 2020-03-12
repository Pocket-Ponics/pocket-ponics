import React from 'react'
import { shallow } from 'enzyme'

import GreenhouseScreen from '../../screens/greenhouse-screen'

describe('Greenhouse Screen', () => {
	test('renders correctly', () => {
		global.greenhouses = {}
		const tree = shallow(
			<GreenhouseScreen navigation={{ getParam: jest.fn(), addListener: jest.fn() }} />
		).html()
		expect(tree).toMatchSnapshot()
	})
})