import React from 'react';
import { Text, View, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import styles from './display-styles'

import GreenhouseDisplay from './display'
import GreenhouseStatsDisplay from './stats'
import GreenhouseHistoryDisplay from './history'

const tierImage = require('../../assets/tier.png')
const toptierImage = require('../../assets/top-tier.png')

const onPress = event => {
	console.log(event)
}

class GreenhouseSwipeable extends React.Component {
	constructor(props) {
		super(props)

		this.swipeable = React.createRef();
	}

	swipeRight() {
		this.swipeable.current.close()
		this.props.onSwipeableRightOpen()
	}

	render() {

		const { width } = Dimensions.get('window');
		return (
			<ScrollView style={{ width }}>
				<GreenhouseDisplay navigation={this.props.navigation} />
				<GreenhouseStatsDisplay navigation={this.props.navigation} />
				<GreenhouseHistoryDisplay navigation={this.props.navigation} />
			</ScrollView>
		)
	}	
}

export default GreenhouseSwipeable