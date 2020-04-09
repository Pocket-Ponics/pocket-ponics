import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import SoakWoolScreen from '../../screens/soak-wool-screen'

describe('Soak Wool Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<SoakWoolScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})

	test('continues registration', () => {
		const navigation = {
			navigate: jest.fn(),
			dispatch: jest.fn()
		}

		const tree = shallow(<SoakWoolScreen navigation={navigation}/>)

		tree.find(TouchableOpacity).at(0).props().onPress()

		expect(navigation.dispatch).toHaveBeenCalled()
	})

	test('cancels registration', () => {
		const navigation = {
			navigate: jest.fn(),
			dispatch: jest.fn()
		}

		const tree = shallow(<SoakWoolScreen navigation={navigation}/>)

		tree.find(TouchableOpacity).at(1).props().onPress()

		expect(navigation.navigate).toHaveBeenCalledWith('Greenhouse')
	})
})