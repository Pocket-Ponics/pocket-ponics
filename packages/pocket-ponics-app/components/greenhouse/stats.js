import React from 'react'
import { Text, View, Image } from 'react-native'

import styles from './stats-styles'

const batteryImage = require('../../assets/battery75.png')
const waterImage = require('../../assets/water75.png')
const nutrientImage = require('../../assets/nutrient25.png')

const GreenhouseStatsDisplay = props => {
	return (
		<View style={styles.background}>
			<Text style={styles.title}>Current Stats</Text>
			<View style={styles.iconContainer}>
				<Image source={batteryImage} style={styles.iconWide}/>
				<Text style={styles.text}>Battery: {props.stats.battery}%</Text>
			</View>
			<View style={styles.iconContainer}>
				<Image source={waterImage} style={styles.icon}/>
				<Text style={styles.text}>Water: {props.stats.water}%</Text>
			</View>
			<View style={styles.iconContainer}>
				<Image source={nutrientImage} style={styles.icon}/>
				<Text style={styles.text}>Nutrients:  {props.stats.nutrient}%</Text>
			</View>
		</View>
	)
}

export default GreenhouseStatsDisplay