import React from 'react'
import { Text, View, Image } from 'react-native'

import styles from './stats-styles'

const battery0 = require('../../assets/battery0.png')
const battery25 = require('../../assets/battery25.png')
const battery75 = require('../../assets/battery75.png')
const battery100 = require('../../assets/battery100.png')
const water0 = require('../../assets/water0.png')
const water25 = require('../../assets/water25.png')
const water75 = require('../../assets/water75.png')
const water100 = require('../../assets/water100.png')
const nutrient0 = require('../../assets/nutrient0.png')
const nutrient25 = require('../../assets/nutrient25.png')
const nutrient75 = require('../../assets/nutrient75.png')
const nutrient100 = require('../../assets/nutrient100.png')

const battery = [battery0, battery25, battery75, battery100]
const water = [water0, water25, water75, water100]
const nutrient = [nutrient0, nutrient25, nutrient75, nutrient100]

const getImageForPercent = (imageArray, percent) => {
	if(percent < 10) {
		return imageArray[0]
	} 
	if (percent < 50) {
		return imageArray[1]
	} 
	if (percent < 90) {
		return imageArray[2]
	}
	return imageArray[3]
}

const GreenhouseStatsDisplay = props => {
	return (
		<View style={styles.background}>
			<Text style={styles.title}>Current Stats</Text>
			<View style={styles.iconContainer}>
				<Image source={getImageForPercent(battery, props.stats.battery)} style={styles.iconWide}/>
				<Text style={styles.text}>Battery: {props.stats.battery}%</Text>
			</View>
			<View style={styles.iconContainer}>
				<Image source={getImageForPercent(water, props.stats.water)} style={styles.icon}/>
				<Text style={styles.text}>Water: {props.stats.water}%</Text>
			</View>
			<View style={styles.iconContainer}>
				<Image source={getImageForPercent(nutrient, props.stats.nutrient)} style={styles.icon}/>
				<Text style={styles.text}>Nutrients:  {props.stats.nutrient}%</Text>
			</View>
		</View>
	)
}

export default GreenhouseStatsDisplay