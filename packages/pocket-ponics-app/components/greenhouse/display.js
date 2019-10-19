import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './display-styles'

const tierImage = require('../../assets/tier.png')

const onPress = event => {
	console.log(event)
}

const GreenhouseDisplay = props => {
	const { navigate } = props.navigation

	return (
		<View style={styles.background}>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Tomato' })}>
				<Image source={tierImage} style={styles.tier}/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Spinach' })}>
				<Image source={tierImage} style={styles.tier}/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Green Beans' })}>
				<Image source={tierImage} style={styles.tier}/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Turnip' })}>
				<Image source={tierImage} style={styles.tier}/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Seedlings' })}>
				<Image source={tierImage} style={styles.tier}/>
			</TouchableOpacity>
		</View>
	)
}

export default GreenhouseDisplay