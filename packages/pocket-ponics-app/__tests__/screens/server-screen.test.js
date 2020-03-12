import React from 'react'
import { shallow } from 'enzyme'

import ServerScreen from '../../screens/server-screen'

describe('Server Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<ServerScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})