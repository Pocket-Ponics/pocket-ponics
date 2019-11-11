import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Text, View, ScrollView } from 'react-native';

import GreenhouseDisplay from '../components/greenhouse/display'
import GreenhouseSwipeable from '../components/greenhouse/swipeable'
import GreenhouseList from '../components/greenhouse/greenhouse-list'
import GreenhouseStatsDisplay from '../components/greenhouse/stats'
import GreenhouseHistoryDisplay from '../components/greenhouse/history'
import DotScrollMenu from '../components/greenhouse/dot-scroll-menu'

const mockGreenhouseList = [
	{
		id: '1',
		name: "Greenhouse 1"
	},
	{
		id: '2',
		name: "Greenhouse 2"
	}
]

class GreenhouseScreen extends React.Component {
	static navigationOptions = {
		title: 'Greenhouse 1',
	}

	constructor(props) {
		super(props)

		this.state = {
			currentGreenhouse: 0
		}
	}

	swapItem(index) {
		this.setState({ currentGreenhouse: index })
	}

	render() {
		return (
			<View>
				<DotScrollMenu 
					greenhouseList={mockGreenhouseList} 
					current={this.state.currentGreenhouse}/>

				<GreenhouseList 
					greenhouses={mockGreenhouseList} 
					navigation={this.props.navigation}
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
			</View>
		)
	}
}

export default GreenhouseScreen