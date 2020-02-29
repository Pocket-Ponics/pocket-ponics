import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import Display from '../../components/greenhouse/display'

describe('Greenhouse Display', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<Display 
				navigation={{}} 
				tiers={[
					{
						'tier': 1,
						'plant_id': 5,
						'ph_level': 0,
						'ec_level': 0,
						'water_level': 0,
						'cycle_time': null,
						'num_plants': 0
					},
					{
						'tier': 2,
						'plant_id': 2,
						'ph_level': 0,
						'ec_level': 0,
						'water_level': 0,
						'cycle_time': null,
						'num_plants': 0
					},
					{
						'tier': 3,
						'plant_id': 3,
						'ph_level': 0,
						'ec_level': 0,
						'water_level': 0,
						'cycle_time': null,
						'num_plants': 0
					},
					{
						'tier': 4,
						'plant_id': 4,
						'ph_level': 0,
						'ec_level': 0,
						'water_level': 0,
						'cycle_time': null,
						'num_plants': 0
					}
				]}/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders with no tiers', () => {
		const tree = shallow(
			<Display 
				navigation={{}} 
				tiers={[
					{
						'tier': 1,
						'plant_id': null,
					},
					{
						'tier': 2,
						'plant_id': null,
					},
					{
						'tier': 3,
						'plant_id': null,
					},
					{
						'tier': 4,
						'plant_id': null,
					}
				]}/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders with seedlings', () => {
		const tree = shallow(
			<Display 
				navigation={{}} 
				displaySeedlings={true}
				tiers={[
					{
						'tier': 1,
						'plant_id': null,
					},
					{
						'tier': 2,
						'plant_id': null,
					},
					{
						'tier': 3,
						'plant_id': null,
					},
					{
						'tier': 4,
						'plant_id': null,
					}
				]}/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders correctly', () => {
		const navigation = {
			navigate: jest.fn()
		}

		const tree = shallow(
			<Display 
				navigation={navigation} 
				displaySeedlings={true}
				tiers={[
					{
						'tier': 1,
						'plant_id': 5,
						'ph_level': 0,
						'ec_level': 0,
						'water_level': 0,
						'cycle_time': null,
						'num_plants': 0
					},
					{
						'tier': 2,
						'plant_id': 2,
						'ph_level': 0,
						'ec_level': 0,
						'water_level': 0,
						'cycle_time': null,
						'num_plants': 0
					},
					{
						'tier': 3,
						'plant_id': 3,
						'ph_level': 0,
						'ec_level': 0,
						'water_level': 0,
						'cycle_time': null,
						'num_plants': 0
					},
					{
						'tier': 4,
						'plant_id': 4,
						'ph_level': 0,
						'ec_level': 0,
						'water_level': 0,
						'cycle_time': null,
						'num_plants': 0
					}
				]}/>)

		tree.find(TouchableOpacity).at(0).props().onPress()
		tree.find(TouchableOpacity).at(1).props().onPress()
		tree.find(TouchableOpacity).at(2).props().onPress()
		tree.find(TouchableOpacity).at(3).props().onPress()
		tree.find(TouchableOpacity).at(4).props().onPress()

		expect(navigation.navigate).toHaveBeenCalledTimes(5)
	})
})