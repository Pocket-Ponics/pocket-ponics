import React from 'react'
import { shallow } from 'enzyme'

import SoakWoolScreen from '../../screens/soak-wool-screen'

describe('Soak Wool Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<SoakWoolScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})