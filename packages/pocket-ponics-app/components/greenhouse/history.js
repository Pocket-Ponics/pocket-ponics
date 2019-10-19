import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './history-styles'

const onPress = event => {
	console.log(event)
}

const GreenhouseHistoryDisplay = props => {
	const { navigate } = props.navigation

	return (
		<View style={styles.background}>
			<Text>History card</Text>
		</View>
	)
}

export default GreenhouseHistoryDisplay