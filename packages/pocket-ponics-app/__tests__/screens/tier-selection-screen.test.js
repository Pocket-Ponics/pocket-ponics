import React from 'react'
import { shallow } from 'enzyme'

import TierSelectionScreen from '../../screens/tier-selection-screen'

describe('Tier Selection Screen', () => {
	test('renders correctly', () => {
		global.plants = [{},{},{},{},{}]
		const tree = shallow(
			<TierSelectionScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})