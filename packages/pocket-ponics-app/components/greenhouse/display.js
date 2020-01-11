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

const displayTopTier = (tier) => {
	if(!tier || !tier['plant_id']) return null

	switch(tier['plant_id']) {
		case 1: 
			return (
				<Image source={tomatoImage} style={styles.topImage} />
			)
	}
}

const displayTier = (tier) => {
	if(!tier || !tier.name) return (
		<ImageBackground source={tierImage} style={styles.tier} imageStyle={styles.backgroundImg}>
		</ImageBackground>
	)

	let imageSrc
	switch(tier.name) {
		case 'greenbeans': 
			imageSrc = greenbeanImage
			break
		case 'spinach': 
			imageSrc = spinachImage
			break
		case 'turnip': 
			imageSrc = turnipImage
			break
	}

	return (
		<ImageBackground source={tierImage} style={styles.tier} imageStyle={styles.backgroundImg}>
			<Image source={imageSrc} style={styles.image}/>
			<Image source={imageSrc} style={styles.image}/>
			<Image source={imageSrc} style={styles.image}/>
		</ImageBackground>
	)
}

const GreenhouseDisplay = props => {
	const { navigate } = props.navigation

	console.log(props.tiers)

	return (
		<View style={styles.background}>
			<TouchableOpacity style={styles.topButton} onPress={() => navigate('Tier', { plant: props.tiers[0], index: 0 })}>
				<ImageBackground source={toptierImage} style={styles.toptier} imageStyle={styles.backgroundImg}>
					{displayTopTier(props.tiers[0] || {})}
				</ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate('Tier', { plant: props.tiers[1], index: 1 })}>
				{displayTier(props.tiers[1]) || {}}
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate('Tier', { plant: props.tiers[2], index: 2 })}>
				{displayTier(props.tiers[2]) || {}}
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate('Tier', { plant: props.tiers[3], index: 3 })}>
				{displayTier(props.tiers[3]) || {}}
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate('Seedlings', { seedlings: props.seedlings, index: 1 })}>
				<ImageBackground source={tierImage} style={styles.tier} imageStyle={styles.backgroundImg}>
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