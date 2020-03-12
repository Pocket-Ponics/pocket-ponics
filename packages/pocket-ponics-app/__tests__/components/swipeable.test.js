import React from 'react'
import { shallow } from 'enzyme'

import Swipeable from '../../components/greenhouse/swipeable'

describe('Stats Display', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<Swipeable 
				greenhouse={{ tiers: [null, null, null, null], history: [] }} 
				navigation={{}}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
})