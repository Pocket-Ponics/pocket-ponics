import React from 'react'
import { shallow } from 'enzyme'

import TierScreen from '../../screens/tier-screen'

describe('Tier Screen', () => {
	test('renders correctly', () => {
		global.greenhouses = {}
		global.plants = []
		const tree = shallow(
			<TierScreen navigation={{ getParam: jest.fn() }}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
})