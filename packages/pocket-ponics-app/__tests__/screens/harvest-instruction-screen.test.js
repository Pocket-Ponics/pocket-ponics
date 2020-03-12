import React from 'react'
import { shallow } from 'enzyme'

import HarvestInstructionScreen from '../../screens/harvest-instruction-screen'

describe('Harvest Instruction Screen', () => {
	test('renders correctly', () => {
		global.plants = []
		const tree = shallow(
			<HarvestInstructionScreen  navigation={{ getParam: jest.fn() }}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
})