import React from 'react';
import { Text, View, ScrollView, SafeAreaView, Button } from 'react-native';

import GreenhouseDisplay from '../components/greenhouse/display'
import NewGreenhouse from '../components/greenhouse/new-greenhouse'
import GreenhouseList from '../components/greenhouse/greenhouse-list'
import DotScrollMenu from '../components/greenhouse/dot-scroll-menu'

class GreenhouseScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', ''),
			headerRight: () => {
				const retrievedData = navigation.getParam('retrievedData', { greenhouses: [] })
				return (
					<Button
						onPress={() => navigation.navigate('Profile', { retrievedData })}
						title="Profile"
						color="#fff"/>
				)
			},
		}
	}

	constructor(props) {
		super(props)

		this.retrievedData = this.props.navigation.getParam('retrievedData', { greenhouses: [] })
		this.state = {
			currentGreenhouse: 0,
			greenhouses: this.retrievedData.greenhouses
		}
		this.props.navigation.setParams({ title: this.state.greenhouses[0].name })
	}

	swapItem(index) {
		this.props.navigation.setParams({ title: this.state.greenhouses[index].name })
		this.setState({ currentGreenhouse: index })
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1, backgroundColor: '#472600' }}>
				<DotScrollMenu 
					greenhouseList={this.state.greenhouses} 
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
				<GreenhouseList 
					token={this.retrievedData.token}
					style={{flex: 1}}
					greenhouses={this.state.greenhouses} 
					navigation={this.props.navigation}
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
			</SafeAreaView>
		)
	}
}


				

export default GreenhouseScreen