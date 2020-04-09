import React from 'react'
import { View, TouchableOpacity, Image, ImageBackground } from 'react-native'

import styles from './display-styles'
import { TOMATO_ID, GREENBEAN_ID, SPINACH_ID, TURNIP_ID } from '../../util/constants'

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
	case TOMATO_ID: 
		return (
			<Image source={tomatoImage} style={styles.topImage} />
		)
	}
}

const displayTier = (tier) => {
	if(!tier || !tier['plant_id']) return (
		<ImageBackground source={tierImage} style={styles.tier} imageStyle={styles.backgroundImg}>
		</ImageBackground>
	)

	let imageSrc
	switch(tier['plant_id']) {
	case GREENBEAN_ID: 
		imageSrc = greenbeanImage
		break
	case SPINACH_ID: 
		imageSrc = spinachImage
		break
	case TURNIP_ID: 
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

	return (
		<View style={styles.background}>
			<TouchableOpacity style={styles.topButton} onPress={() => navigate('Tier', { tierId: 1, greenhouseId: props.id })}>
				<ImageBackground source={toptierImage} style={styles.toptier} imageStyle={styles.backgroundImg}>
					{displayTopTier(props.tiers[0])}
				</ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate('Tier', { tierId: 2, greenhouseId: props.id, greenhouseName: props.name })}>
				{displayTier(props.tiers[1])}
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate('Tier', { tierId: 3, greenhouseId: props.id, greenhouseName: props.name })}>
				{displayTier(props.tiers[2])}
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate('Tier', { tierId: 4, greenhouseId: props.id, greenhouseName: props.name })}>
				{displayTier(props.tiers[3])}
			</TouchableOpacity>
			{props.displaySeedlings ? (
				<TouchableOpacity style={styles.button} onPress={() => navigate('Seedlings', { seedlings: props.seedlings, name: props.name, greenhouseId: props.id })}>
					<ImageBackground source={tierImage} style={styles.tier} imageStyle={styles.backgroundImg}>
						<Image source={seedlingImage} style={styles.seedling}/>
						<Image source={seedlingImage} style={styles.seedling}/>
						<Image source={seedlingImage} style={styles.seedling}/>
						<Image source={seedlingImage} style={styles.seedling}/>
						<Image source={seedlingImage} style={styles.seedling}/>
					</ImageBackground>
				</TouchableOpacity>
			) : null}
		</View>
	)
}

export default GreenhouseDisplay