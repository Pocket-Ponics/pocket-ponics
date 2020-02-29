import React from 'react'
import { shallow } from 'enzyme'
import Carousel from 'react-native-snap-carousel'

import GreenhouseList from '../../components/greenhouse/greenhouse-list'

describe('Greenhouse Display', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<GreenhouseList
				greenhouses={[{},{},{}]}
				current={0}/>).html()
		expect(tree).toMatchSnapshot()
	})

	test('renders correctly', () => {
		const tree = shallow(
			<GreenhouseList
				greenhouses={[{},{},{}]}
				current={0}/>)


		expect(tree.find(Carousel).at(0).props().renderItem({ item: {
			tiers: []
		}})).toMatchSnapshot()

		expect(tree.find(Carousel).at(0).props().renderItem({ item: {
		}})).toMatchSnapshot()
	})
})