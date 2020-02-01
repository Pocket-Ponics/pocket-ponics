import React from 'react'
import { 
	Text, 
	View, 
	Image,
	TouchableOpacity
} from 'react-native'

import { 
	TOMATO_ID, 
	GREENBEAN_ID, 
	SPINACH_ID,
	TURNIP_ID,
} from '../util/constants'

import styles from './setup-styles'

const tomatoHarvest = require('../assets/tomato_harvest.png')
const greenbeanHarvest = require('../assets/greenbean_harvest.png')
const spinachHarvest = require('../assets/spinach_harvest.png')
const turnipHarvest = require('../assets/turnip_harvest.png')

class HarvestInstructionScreen extends React.Component {
	getHarvestImage(name) {
		switch(name) {
		case TOMATO_ID:
			return tomatoHarvest
		case GREENBEAN_ID:
			return greenbeanHarvest
		case SPINACH_ID:
			return spinachHarvest
		case TURNIP_ID:
			return turnipHarvest
		}
	}

	getHarvestInstructions(id) {
		return global.plants[id].steps
	}

	render() {
		const id = this.props.navigation.getParam('id')
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Harvest</Text>
					<Text style={styles.text}>{this.getHarvestInstructions(id)}</Text>
					<Image source={this.getHarvestImage(id)} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Greenhouse')}>
						<Text style={styles.buttonText}>Done Harvesting</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}	

}

export default HarvestInstructionScreen