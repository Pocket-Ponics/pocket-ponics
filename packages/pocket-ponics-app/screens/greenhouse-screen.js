import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import GreenhouseDisplay from '../components/greenhouse/display'
import GreenhouseStatsDisplay from '../components/greenhouse/stats'
import GreenhouseHistoryDisplay from '../components/greenhouse/history'
import DotScrollMenu from '../components/greenhouse/dot-scroll-menu'

console.log(GreenhouseDisplay)

const GreenhouseScreen = props => {
	return (
		<View>
			<DotScrollMenu />
			<ScrollView>
				<GreenhouseDisplay navigation={props.navigation} />
				<GreenhouseStatsDisplay navigation={props.navigation} />
				<GreenhouseHistoryDisplay navigation={props.navigation} />
			</ScrollView>
		</View>
	)
}

export default GreenhouseScreen