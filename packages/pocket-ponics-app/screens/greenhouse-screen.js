import React from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';

import GreenhouseDisplay from '../components/greenhouse/display'
import GreenhouseSwipeable from '../components/greenhouse/swipeable'
import GreenhouseList from '../components/greenhouse/greenhouse-list'
import GreenhouseStatsDisplay from '../components/greenhouse/stats'
import GreenhouseHistoryDisplay from '../components/greenhouse/history'
import DotScrollMenu from '../components/greenhouse/dot-scroll-menu'

const mockGreenhouseList = [
	{
		id: '1',
		name: "Greenhouse 1",
		stats: {
			battery: 61,
			water: 78,
			nutrient: 14
		},
		tiers: ['tomato', 'spinach', 'turnip', 'greenbeans']
	},
	{
		id: '2',
		name: "Greenhouse 2",
		stats: {
			battery: 74,
			water: 63,
			nutrient: 23
		},
		tiers: ['tomato', 'greenbeans', 'greenbeans', 'greenbeans']
	}
]

class GreenhouseScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', mockGreenhouseList[0].name),
		}
	}

	constructor(props) {
		super(props)

		this.state = {
			currentGreenhouse: 0
		}
	}

	swapItem(index) {
		this.props.navigation.setParams({ title: mockGreenhouseList[index].name })
		this.setState({ currentGreenhouse: index })
	}

	render() {
		return (
			<SafeAreaView>
				<DotScrollMenu 
					greenhouseList={mockGreenhouseList} 
					current={this.state.currentGreenhouse}/>
				<GreenhouseList 
					greenhouses={mockGreenhouseList} 
					navigation={this.props.navigation}
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
			</SafeAreaView>
		)
	}
}

export default GreenhouseScreen