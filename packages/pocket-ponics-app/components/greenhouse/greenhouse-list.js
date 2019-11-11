import React from 'react';
import { Text, View, ScrollView, FlatList, Animated, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SideSwipe from 'react-native-sideswipe';

import styles from './display-styles'

import GreenhouseSwipeable from './swipeable'

class GreenhouseList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentIndex: 0
		}
	}

	render() {
		const { width } = Dimensions.get('window');
		const contentOffset = (width - width) / 2;

		return (
			<SideSwipe
				index={this.props.current}
				itemWidth={width}
				style={{ width }}
				data={this.props.greenhouses}
				contentOffset={contentOffset}
				onIndexChange={this.props.swapItem}
				onEndReached={() => console.log('end')}
				renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
				 	<GreenhouseSwipeable
				 		greenhouse={item}
				 		navigation={this.props.navigation}/>
				)}
			/>
		)
	}
}

export default GreenhouseList