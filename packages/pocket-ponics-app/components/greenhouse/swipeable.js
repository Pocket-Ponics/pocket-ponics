import React from 'react'
import { Text, View, ScrollView } from 'react-native'

import styles from './swipeable-styles'

import GreenhouseDisplay from './display'
import GreenhouseStatsDisplay from './stats'
import GreenhouseHistoryDisplay from './history'

class GreenhouseSwipeable extends React.Component {
	constructor(props) {
		super(props)

		this.swipeable = React.createRef()
	}

	getStats() {
		return {
			battery: this.props.greenhouse.battery,
			water: this.props.greenhouse.water_level,
			nutrient: this.props.greenhouse.nutrient_level
		}
	}

	render() {
		return (
			<ScrollView style={styles.scroller}>
				<View style={styles.greenhouseBackground}>
					<Text style={styles.greenhouseTitle}>{this.props.greenhouse.name}</Text>
					<GreenhouseDisplay 
						navigation={this.props.navigation} 
						tiers={this.props.greenhouse.tiers} 
						seedlings={this.props.greenhouse.seedling_time}
						displaySeedlings={this.props.greenhouse.seedling_time}/>
				</View>
				<GreenhouseStatsDisplay stats={this.getStats() || {}} navigation={this.props.navigation} />
				<GreenhouseHistoryDisplay navigation={this.props.navigation} />
			</ScrollView>
		)
	}	
}

export default GreenhouseSwipeable