import React from 'react'
import { shallow } from 'enzyme'

import PurpleLightScreen from '../../screens/purple-light-screen'

describe('Purple Light Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<PurpleLightScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})