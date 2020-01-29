import React from 'react'
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native'

import { 
	TOMATO_ID, 
	GREENBEAN_ID, 
	SPINACH_ID,
	TURNIP_ID,
	ONE_DAY
} from '../util/constants'

import styles from './setup-styles'

const tomatoHarvest = require('../assets/tomato_harvest.png')
const greenbeanHarvest = require('../assets/greenbean_harvest.png')
const spinachHarvest = require('../assets/spinach_harvest.png')
const turnipHarvest = require('../assets/turnip_harvest.png')

export default class Example extends React.Component {

	getReadableName(name) {
		switch(name) {
		case 'tomato':
			return 'Tomatoes'
		case 'greenbeans':
			return 'Green Beans'
		case 'spinach':
			return 'Spinach'
		case 'turnip':
			return 'Turnips'
		}
	}

	getHarvestImage(name) {
		switch(name) {
		case 'Tomatoes':
			return tomatoHarvest
		case 'Green Beans':
			return greenbeanHarvest
		case 'Spinach':
			return spinachHarvest
		case 'Turnip':
			return turnipHarvest
		}
	}

	getHarvestInstructions(name) {
		switch(name) {
		case 'Tomatoes':
			return 'With one hand, hold the stem of the plant. With the other hand, grasp the fuit firmly yet gently. Pull the fruit away from the stem, breaking the stalk just above the calyx(star-shaped leaves on top of the tomato). Enjoy your tomatoes, and start thinking about what you want to grow next!'
		case 'Green Beans':
			return 'With one hand, hold the stem of the plant. With the other hand, grasp the top of the green bean firmly. gently pull the pod away from the stem, breaking it off the vine. Enjoy your green beans, and start thinking about what you want to grow next!'
		case 'Spinach':
			return 'To harvest your spinach, you will need a pair of scissors. Simply cut off the leaves as close to the root as you can. Your spinach plant will continue regrowing these leaves until you decide to remove the entire plant. Enjoy your spinach, and start thinking about what you want to grow next!'
		case 'Turnip':
			return global.plants[TURNIP_ID].steps
		}
	}

	render() {
		const name = this.props.navigation.getParam('name')
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Harvest</Text>
					<Text style={styles.text}>{this.getHarvestInstructions(name)}</Text>
					<Image source={this.getHarvestImage(name)} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Greenhouse')}>
						<Text style={styles.buttonText}>Done Harvesting</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}	

}

