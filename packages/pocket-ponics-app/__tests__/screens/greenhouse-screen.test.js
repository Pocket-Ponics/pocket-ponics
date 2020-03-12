import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import GreenhouseScreen from '../../screens/greenhouse-screen'
import GreenhouseList from '../../components/greenhouse/greenhouse-list'

describe('Greenhouse Screen', () => {
	test('renders correctly', () => {
		global.greenhouses = {}
		const tree = shallow(
			<GreenhouseScreen navigation={{ 
				getParam: jest.fn(), 
				addListener: jest.fn().mockImplementationOnce((str, fn) => fn()) 
			}} />
		).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders with a specific greenhouse', () => {
		global.greenhouses = { 7: {} }
		const tree = shallow(
			<GreenhouseScreen navigation={{ 
				getParam: jest.fn().mockReturnValue(7), 
				addListener: jest.fn().mockImplementationOnce((str, fn) => fn()) 
			}} />
		).html()
		expect(tree).toMatchSnapshot()
	})

	test('swapIndex changes greenhouse', () => {
		global.greenhouses = {}
		const tree = shallow(
			<GreenhouseScreen navigation={{ 
				getParam: jest.fn(), 
				addListener: jest.fn().mockImplementationOnce((str, fn) => fn()),
				setParams: jest.fn()
			}} />
		)

		tree.find(GreenhouseList).at(0).props().swapItem(0)
		expect(tree.html()).toMatchSnapshot()
	})

	test('navigation options display profile button', () => {
		const ProfileButton = GreenhouseScreen.navigationOptions({ navigation: {
			navigate: jest.fn()
		}}).headerRight
		const tree = shallow(
			<ProfileButton />
		)

		tree.find(TouchableOpacity).at(0).props().onPress(0)
		expect(tree.html()).toMatchSnapshot()
	})
})