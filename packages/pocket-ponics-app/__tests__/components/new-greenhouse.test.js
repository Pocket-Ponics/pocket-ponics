import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import NewGreenhouse from '../../components/greenhouse/new-greenhouse'

describe('New Greenhouse', () => {
	test('renders correctly', () => {
		const tree = shallow(<NewGreenhouse/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders correctly', () => {
		const navigation = {
			dispatch: jest.fn()
		}
		const tree = shallow(<NewGreenhouse navigation={navigation}/>)

		tree.find(TouchableOpacity).at(0).props().onPress()
		expect(navigation.dispatch).toHaveBeenCalled()
	})
})