import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './stats-styles'

const onPress = event => {
	console.log(event)
}

const GreenhouseStatsDisplay = props => {
	const { navigate } = props.navigation

	return (
		<View style={styles.background}>
			<Text>Battery</Text>
			<Text>Water Level</Text>
			<Text>Nutrient Level</Text>
		</View>
	)
}

export default GreenhouseStatsDisplay