import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import styles from './greenhouse-screen-styles'

import GreenhouseList from '../components/greenhouse/greenhouse-list'
import DotScrollMenu from '../components/greenhouse/dot-scroll-menu'

class GreenhouseScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Greenhouses',
			headerRight: () => (
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { username: global.username })}>
					<Text style={styles.buttonText}>Profile</Text>
				</TouchableOpacity>
			)
		}
	}

	constructor(props) {
		super(props)

		const greenhouseId = this.props.navigation.getParam('greenhouseId', '')
		const greenhouses = [
			...Object.values(global.greenhouses),
			{
				type: 'add-page',
				name: 'Setup',
			}
		]
		const matchingIndex = greenhouses.findIndex(greenhouse => greenhouse.greenhouse_id === greenhouseId)
		const currentGreenhouse = matchingIndex === -1 ? 0 : matchingIndex

		this.state = {
			currentGreenhouse,
			greenhouses,
			username: global.username
		}

		// Handle the cases when we navigate back to the greenhouse screen but the greenhouses have changed
		this.props.navigation.addListener('didFocus', () => {
			const greenhouseId = this.props.navigation.getParam('greenhouseId', '')
			const greenhouses = [
				...Object.values(global.greenhouses),
				{
					type: 'add-page',
					name: 'Setup',
				}
			]
			const matchingIndex = greenhouses.findIndex(greenhouse => greenhouse.greenhouse_id === greenhouseId)
			const currentGreenhouse = matchingIndex === -1 ? 0 : matchingIndex

			this.setState({ greenhouses, currentGreenhouse })
		})
	}

	swapItem(index) {
		this.props.navigation.setParams({ title: this.state.greenhouses[index].name })
		this.setState({ currentGreenhouse: index })
	}

	render() {
		return (
			<View style={styles.background}>
				<DotScrollMenu 
					greenhouseList={this.state.greenhouses} 
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
				<GreenhouseList 
					style={styles.container}
					greenhouses={this.state.greenhouses} 
					navigation={this.props.navigation}
					current={this.state.currentGreenhouse}
					swapItem={this.swapItem.bind(this)}/>
			</View>
		)
	}
}

export default GreenhouseScreen