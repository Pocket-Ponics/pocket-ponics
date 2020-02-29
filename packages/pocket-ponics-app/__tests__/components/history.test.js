import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity, Text } from 'react-native'

import History from '../../components/greenhouse/history'

describe('Greenhouse Display', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<History
				history={[
					{
						date: '1/2/2020',
						battery: 30,
						nutrient_level: 40,
						water_level: 50
					},
					{
						date: '1/3/2020',
						battery: 30,
						nutrient_level: 40,
						water_level: 50
					},
					{
						date: '1/4/2020',
						battery: 30,
						nutrient_level: 40,
						water_level: 50
					}
				]}/>).html()
		expect(tree).toMatchSnapshot()
	})
})