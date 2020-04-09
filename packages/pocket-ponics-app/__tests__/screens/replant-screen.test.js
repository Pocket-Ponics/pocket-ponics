import React from 'react'
import { shallow } from 'enzyme'

import ReplantScreen from '../../screens/replant-screen'

describe('Replant Screen', () => {
	test('renders correctly', () => {
		global.plants = []
		const tree = shallow(
			<ReplantScreen navigation={{ getParam: jest.fn() }}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
})