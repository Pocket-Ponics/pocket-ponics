import React from 'react'
import { shallow } from 'enzyme'

import SeedlingsScreen from '../../screens/seedlings-screen'

describe('Seedlings Screen', () => {
	test('renders correctly', () => {
		global.greenhouses = {}
		const tree = shallow(
			<SeedlingsScreen navigation={{ getParam: jest.fn() }}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
})