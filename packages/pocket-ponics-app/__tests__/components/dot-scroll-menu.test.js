import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import DotScrollMenu from '../../components/greenhouse/dot-scroll-menu'

describe('Greenhouse Display', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<DotScrollMenu 
				greenhouseList={[{},{},{}]}
				current={0}/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders with last selected', () => {
		const tree = shallow(
			<DotScrollMenu 
				greenhouseList={[{},{},{}]}
				current={2}/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders with only 1 item', () => {
		const tree = shallow(
			<DotScrollMenu 
				greenhouseList={[{}]}
				current={0}/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('clicks on buttons', () => {
		const swapItem = jest.fn()
		const tree = shallow(
			<DotScrollMenu 
				greenhouseList={[{},{}]}
				current={0}
				swapItem={swapItem}/>)

		tree.find(TouchableOpacity).at(0).props().onPress()
		tree.find(TouchableOpacity).at(1).props().onPress()

		expect(swapItem).toHaveBeenCalledTimes(2)
	})
})