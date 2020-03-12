import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import HarvestInstructionScreen from '../../screens/harvest-instruction-screen'

describe('Harvest Instruction Screen', () => {
	test('renders correctly', () => {
		global.plants = []
		const tree = shallow(
			<HarvestInstructionScreen  navigation={{ 
				getParam: jest.fn().mockReturnValue(5)
			}}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
	test('renders greenbean', () => {
		global.plants = []
		const tree = shallow(
			<HarvestInstructionScreen  navigation={{ 
				getParam: jest.fn().mockReturnValue(2)
			}}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
	test('renders spinach', () => {
		global.plants = []
		const tree = shallow(
			<HarvestInstructionScreen  navigation={{ 
				getParam: jest.fn().mockReturnValue(3)
			}}/>
		).html()
		expect(tree).toMatchSnapshot()
	})
	test('renders turnip', () => {
		global.plants = []
		const tree = shallow(
			<HarvestInstructionScreen  navigation={{ 
				getParam: jest.fn().mockReturnValue(4)
			}}/>
		).html()
		expect(tree).toMatchSnapshot()
	})

	test('goes to next screen', () => {
		global.plants = []
		const tree = shallow(
			<HarvestInstructionScreen  navigation={{ 
				getParam: jest.fn().mockReturnValue(3),
				navigate: jest.fn(),
				state: { params: {} }
			}}/>
		)
		tree.find(TouchableOpacity).at(0).props().onPress()
		expect(tree.html()).toMatchSnapshot()
	})

	test('goes to next screen', () => {
		global.plants = []
		const tree = shallow(
			<HarvestInstructionScreen  navigation={{ 
				getParam: jest.fn().mockReturnValue(4),
				navigate: jest.fn(),
				state: { params: {} }
			}}/>
		)
		tree.find(TouchableOpacity).at(0).props().onPress()
		expect(tree.html()).toMatchSnapshot()
	})
})