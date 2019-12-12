import React from 'react';
import { Text, View, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';

import GreenhouseDisplay from './display'
import GreenhouseStatsDisplay from './stats'
import GreenhouseHistoryDisplay from './history'

class GreenhouseSwipeable extends React.Component {
	constructor(props) {
		super(props)

		this.swipeable = React.createRef();
	}

	render() {

		const { width } = Dimensions.get('window');
		return (
			<ScrollView style={{ width }}>
				<View style={{ height: 600 }}>
					<GreenhouseDisplay navigation={this.props.navigation} tiers={this.props.greenhouse.tiers}/>
				</View>
				<GreenhouseStatsDisplay stats={this.props.greenhouse.stats || {}} navigation={this.props.navigation} />
				<GreenhouseHistoryDisplay navigation={this.props.navigation} />
			</ScrollView>
		)
	}	
}

export default GreenhouseSwipeable