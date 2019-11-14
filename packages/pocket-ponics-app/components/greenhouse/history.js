import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './history-styles'

const mockHistory = require('../../assets/mockHistory.jpg')

const onPress = event => {
	console.log(event)
}

const GreenhouseHistoryDisplay = props => {
	const { navigate } = props.navigation

	return (
		<View style={styles.background}>
			<Image source={mockHistory} style={styles.history}/>
		</View>
	)
}

export default GreenhouseHistoryDisplay