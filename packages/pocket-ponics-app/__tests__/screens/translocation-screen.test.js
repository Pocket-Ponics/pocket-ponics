import React from 'react'
import { shallow } from 'enzyme'

import TranslocationScreen from '../../screens/translocation-screen'

describe('Translocation Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<TranslocationScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})