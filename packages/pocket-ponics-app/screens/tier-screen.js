import React from 'react';
import { Text, View } from 'react-native';

const TierScreen = props => {
	const { navigate } = props.navigation
	return (
		<View>
			<Text>{props.navigation.getParam('plant')}</Text>
		</View>
	)
}

export default TierScreen