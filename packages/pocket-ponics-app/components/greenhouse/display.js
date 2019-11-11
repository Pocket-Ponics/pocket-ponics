import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

import styles from './display-styles'

const tierImage = require('../../assets/tier.png')
const toptierImage = require('../../assets/top-tier.png')
const tomatoImage = require('../../assets/tomato.png')
const greenbeanImage = require('../../assets/greenbean.png')
const spinachImage = require('../../assets/spinach.png')
const turnipImage = require('../../assets/turnip.png')
const seedlingImage = require('../../assets/seedling.png')

const onPress = event => {
	console.log(event)
}

const GreenhouseDisplay = props => {
	const { navigate } = props.navigation

	return (
		<View style={styles.background}>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Tomato' })}>
				<ImageBackground source={toptierImage} style={styles.toptier}>
					<Image source={tomatoImage} style={styles.topImage}/>
				</ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Spinach' })}>
				<ImageBackground source={tierImage} style={styles.tier}>
					<Image source={greenbeanImage} style={styles.image}/>
					<Image source={greenbeanImage} style={styles.image}/>
					<Image source={greenbeanImage} style={styles.image}/>
				</ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Green Beans' })}>
				<ImageBackground source={tierImage} style={styles.tier}>
					<Image source={spinachImage} style={styles.image}/>
					<Image source={spinachImage} style={styles.image}/>
					<Image source={spinachImage} style={styles.image}/>
				</ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Turnip' })}>
				<ImageBackground source={tierImage} style={styles.tier}>
					<Image source={turnipImage} style={styles.image}/>
					<Image source={turnipImage} style={styles.image}/>
					<Image source={turnipImage} style={styles.image}/>
				</ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: 'Seedlings' })}>
				<ImageBackground source={tierImage} style={styles.tier}>
					<Image source={seedlingImage} style={styles.seedling}/>
					<Image source={seedlingImage} style={styles.seedling}/>
					<Image source={seedlingImage} style={styles.seedling}/>
					<Image source={seedlingImage} style={styles.seedling}/>
					<Image source={seedlingImage} style={styles.seedling}/>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	)
}

export default GreenhouseDisplay