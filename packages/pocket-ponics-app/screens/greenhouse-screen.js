import React from 'react';
import { Text, View, ScrollView, SafeAreaView, Button, AsyncStorage, } from 'react-native';

import GreenhouseDisplay from '../components/greenhouse/display'
import NewGreenhouse from '../components/greenhouse/new-greenhouse'
import GreenhouseList from '../components/greenhouse/greenhouse-list'
import DotScrollMenu from '../components/greenhouse/dot-scroll-menu'

class GreenhouseScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Greenhouses',
			headerRight: () => {
				const greenhouses = navigation.getParam('greenhouses', [])
				const username = navigation.getParam('username', '')

				return (
					<Button
						onPress={() => navigation.navigate('Profile', { greenhouses , username })}
						title="Profile"
						color="#fff"/>
				)
			},
		}
	}

	constructor(props) {
		super(props)

		this.state = {
			currentGreenhouse: 0,
			greenhouses: [],
			username: ''
		}
	}

	async getGreenhouses() {
		const greenhouseString = await AsyncStorage.getItem('greenhouses')
		const username = await AsyncStorage.getItem('username')

		if(greenhouseString === null) {
			console.log('Error retrieving from storage')
			return
		}

		const greenhouses = JSON.parse(greenhouseString)

		const greenhouseId = this.props.navigation.getParam('greenhouseId', 0)
		const matchingIndex = greenhouses.findIndex(greenhouse => true)
		const currentGreenhouse = matchingIndex === -1 ? 0 : matchingIndex

		this.setState({ greenhouses , username,  currentGreenhouse })
		this.props.navigation.setParams({ greenhouses , username })
	}

	componentDidMount() {
		this.getGreenhouses()
	}

	swapItem(index) {
		this.props.navigation.setParams({ title: this.state.greenhouses[index].name })
		this.setState({ currentGreenhouse: index })
	}

	renderLoadingScreen() {
		return (
			<View style={{flex: 1, backgroundColor: '#472600' }}>
				<Text>Loading ...</Text>
			</View>
		)
	}

	render() {
		if(this.state.greenhouses.length < 1) return this.renderLoadingScreen()

		return (
			<View style={{flex: 1, backgroundColor: '#472600' }}>
				<DotScrollMenu 
					greenhouseList={this.state.greenhouses} 
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
				<GreenhouseList 
					style={{flex: 1}}
					greenhouses={this.state.greenhouses} 
					navigation={this.props.navigation}
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
			</View>
		)
	}
}


				

export default GreenhouseScreen