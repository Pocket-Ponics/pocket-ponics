import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import FillWaterScreen from '../../screens/fill-water-screen'

describe('Fill Water Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<FillWaterScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})

	test('continues registration', () => {
		const navigation = {
			navigate: jest.fn(),
			dispatch: jest.fn()
		}

		const tree = shallow(<FillWaterScreen navigation={navigation}/>)

		tree.find(TouchableOpacity).at(0).props().onPress()

		expect(navigation.dispatch).toHaveBeenCalled()
	})

	test('cancels registration', () => {
		const navigation = {
			navigate: jest.fn(),
			dispatch: jest.fn()
		}

		const tree = shallow(<FillWaterScreen navigation={navigation}/>)

		tree.find(TouchableOpacity).at(1).props().onPress()

		expect(navigation.navigate).toHaveBeenCalledWith('Greenhouse')
	})
})