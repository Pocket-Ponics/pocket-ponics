import React from 'react'
import { shallow } from 'enzyme'

import StartSeedlingsScreen from '../../screens/start-seedlings-screen'

describe('Start Seedlings Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<StartSeedlingsScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})