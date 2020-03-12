import React from 'react'
import { shallow } from 'enzyme'

import Stats from '../../components/greenhouse/stats'

describe('Stats Display', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<Stats
				stats={{
					battery: 100,
					water: 80,
					nutrient: 40
				}}/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders with low stats', () => {
		const tree = shallow(
			<Stats
				stats={{
					battery: 40,
					water: 20,
					nutrient: 0
				}}/>).html()
		expect(tree).toMatchSnapshot()
	})
})