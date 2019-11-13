import React from 'react';
import { Text, View, ScrollView, FlatList, Animated, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

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
			<Carousel
				data={this.props.greenhouses}
				renderItem={({ item }) => {
					console.log(item)
					return (
					<GreenhouseSwipeable
						greenhouse={item}
						navigation={this.props.navigation}/>
				)}}
				itemWidth={width}
				sliderWidth={width}
				inactiveSlideScale={0.95}
				inactiveSlideOpacity={1}
				enableMomentum={false}
				activeSlideAlignment={'start'}
				activeAnimationType={'spring'}
				onSnapToItem={this.props.swapItem}
				activeAnimationOptions={{
					friction: 4,
					tension: 40
				}}
			/>
		)
	}
}

export default GreenhouseList