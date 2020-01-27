import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import styles from '../components/greenhouse/harvest';

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

	Steps(name) {
		switch(name) {
			case 'Tomatoes':
				return 'With one hand, hold the stem of the plant. With the other hand, grasp the fuit firmly yet gently. Pull the fruit away from the stem, breaking the stalk just above the calyx(star-shaped leaves on top of the tomato). Enjoy your tomatoes, and start thinking about what you want to grow next!'
			case 'Green Beans':
				return 'With one hand, hold the stem of the plant. With the other hand, grasp the top of the green bean firmly. gently pull the pod away from the stem, breaking it off the vine. Enjoy your green beans, and start thinking about what you want to grow next!'
			case 'Spinach':
				return 'To harvest your spinach, you will need a pair of scissors. Simply cut off the leaves as close to the root as you can. Your spinach plant will continue regrowing these leaves until you decide to remove the entire plant. Enjoy your spinach, and start thinking about what you want to grow next!'
			case 'Turnip':
				return 'Remove the turnip from the tier. with a pair of scissors, remove the leaves on top. Enjoy your turnips, and start thinking about what you want to grow next!'
		}
	}


	render() {
		const name = this.props.navigation.getParam('name')
		return (
			<View style={styles.backgroundContainer}>
				<Text style={styles.value}>
					<Text style={styles.valueName}>instructions for harvesting:</Text> {name}
				</Text>

				<Text style={styles.value}></Text>

				<Text style={styles.value}>
					<Text style={styles.valueName}>Directions: </Text> {this.Steps(name)} 
				</Text>

			</View>
		)
	}	

}

