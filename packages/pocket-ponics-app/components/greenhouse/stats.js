import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './stats-styles'

const batteryImage = require('../../assets/battery75.png')
const waterImage = require('../../assets/water75.png')
const nutrientImage = require('../../assets/nutrient25.png')

const onPress = event => {
	console.log(event)
}

const GreenhouseStatsDisplay = props => {
	const { navigate } = props.navigation

	return (
		<View style={styles.background}>
			<TouchableOpacity>
				<View style={styles.iconContainer}>
					<Image source={batteryImage} style={styles.iconWide}/>
					<Text style={styles.text}>{props.stats.battery}%</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity>
				<View style={styles.iconContainer}>
					<Image source={waterImage} style={styles.icon}/>
					<Text style={styles.text}>{props.stats.water}%</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity>
				<View style={styles.iconContainer}>
					<Image source={nutrientImage} style={styles.icon}/>
					<Text style={styles.text}>{props.stats.nutrient}%</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default GreenhouseStatsDisplay