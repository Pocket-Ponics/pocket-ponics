import React from 'react';
import { Text, View, ScrollView, SafeAreaView, Button } from 'react-native';

import GreenhouseDisplay from '../components/greenhouse/display'
import NewGreenhouse from '../components/greenhouse/new-greenhouse'
import GreenhouseList from '../components/greenhouse/greenhouse-list'
import DotScrollMenu from '../components/greenhouse/dot-scroll-menu'

const mockGreenhouseList = [
	{
		type: 'greenhouse',
		id: '1',
		name: "Greenhouse 1",
		stats: {
			battery: 61,
			water: 78,
			nutrient: 14
		},
		tiers: [
			{
				name: 'tomato',
				pH: 6.3,
				ec: 3.2
			}, 
			{
				name: 'spinach',
				pH: 6.1,
				ec: 1.9,
			}, 
			{
				name: 'turnip',
				pH: 6.2,
				ec: 2.0
			}, 
			{
				name: 'greenbeans',
				pH: 6.4,
				ec: 3.9
			}
		]
	},
	{
		type: 'greenhouse',
		id: '2',
		name: "Greenhouse 2",
		stats: {
			battery: 74,
			water: 63,
			nutrient: 23
		},
		tiers: [
			{
				name: 'tomato',
				pH: 6.7,
				ec: 5.5
			},
			{
				name: 'greenbeans',
				pH: 7.1,
				ec: 4.3
			},
			{
				name: 'greenbeans',
				pH: 6.9,
				ec: 4.2
			},
			{
				name: 'greenbeans',
				pH: 6.6,
				ec: 4.1
			}
		]
	},
	{
		type: 'add-page',
		name: "Setup",
	}
]

class GreenhouseScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', mockGreenhouseList[0].name),
			headerRight: () => (
				<Button
					onPress={() => navigation.navigate('Profile')}
					title="Profile"
					color="#fff"/>
			),
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
			<SafeAreaView style={{flex: 1, backgroundColor: '#472600' }}>
				<DotScrollMenu 
					greenhouseList={mockGreenhouseList} 
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
				<GreenhouseList 
					style={{flex: 1}}
					greenhouses={mockGreenhouseList} 
					navigation={this.props.navigation}
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
			</SafeAreaView>
		)
	}
}


				

export default GreenhouseScreen