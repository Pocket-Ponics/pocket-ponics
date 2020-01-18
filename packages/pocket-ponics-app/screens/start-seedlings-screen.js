import React from 'react'
import { AsyncStorage, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import APIUtil from '../util/api-util'

import styles from './setup-styles'

import { 
	TOMATO_ID, 
	GREENBEAN_ID, 
	SPINACH_ID,
	TURNIP_ID,
} from '../util/constants'

const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

class StartSeedlingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	constructor(props) {
		super(props)

		this.state = {
			tiers: [{}, {}, {}, {}]
		}
	}

	async getTiers() {
		const tiers = await AsyncStorage.getItem('tiers')

		if(tiers === null) {
			console.log('Error retrieving from storage')
			return
		}

		this.setState({ tiers: JSON.parse(tiers) })
	}

	componentDidMount() {
		this.getTiers()
	}

	async goToNext() {
		const name = await AsyncStorage.getItem('name')
		// const serialNo = await AsyncStorage.getItem('serialNo')
		// const password = await AsyncStorage.getItem('password')
		const token = await AsyncStorage.getItem('token')
		const tiers = JSON.parse(await AsyncStorage.getItem('tiers'))

		APIUtil.postGreenhouse(token, name)
			.then(response => {
				console.log('Greenhouse registration response: ', response)
				console.log('Greenhouse: ', response.id)
				return Promise.all([
					APIUtil.postTier(token, response.id, 1, tiers[0].plant_id, tiers[0].num_plants, tiers[0].cycle_time),
					APIUtil.postTier(token, response.id, 2, tiers[1].plant_id, tiers[1].num_plants, tiers[1].cycle_time),
					APIUtil.postTier(token, response.id, 3, tiers[2].plant_id, tiers[2].num_plants, tiers[2].cycle_time),
					APIUtil.postTier(token, response.id, 4, tiers[3].plant_id, tiers[3].num_plants, tiers[3].cycle_time)
				])
			})
			.then(response => {
				console.log('Tier registration response: ', response)
				return this.props.navigation.navigate('Auth')
			})
			.catch(error => {
				console.log('error', error)
				// TODO - remove after the backend is pushed to AWS
				return this.props.navigation.navigate('Auth')
			})
	}

	cancel() {
		this.props.navigation.navigate('Auth')
	}

	getImage(id) {
		switch(id) {
		case TOMATO_ID:
			return tomatoImage
		case GREENBEAN_ID:
			return greenbeanImage
		case SPINACH_ID:
			return spinachImage
		case TURNIP_ID:
			return turnipImage
		}
	}

	render() {
		const seedsArray = this.state.tiers.flatMap(tier => (new Array(tier.num_plants)).fill(tier.plant_id))
		
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Start the seedlings</Text>
					<Text style={styles.text}>Open the seed packets, and place two seeds in each hole of the rockwool, following the layout below. Once all necessary seeds have been placed in the rockwool, slide the seedling tray into the bottom layer of the greenhouse.</Text>
					<FlatList
						contentContainerStyle={styles.listBackground}
						data={seedsArray}
						renderItem={({ item }) => (
							<View style={styles.rockwool}>
								<Image style={styles.imageThumbnail} source={this.getImage(item)} />
							</View>
						)}
						numColumns={5}
						keyExtractor={(item, index) => index.toString()}/>
					<TouchableOpacity style={styles.button} onPress={this.goToNext.bind(this)}>
						<Text style={styles.buttonText}>Complete Setup!</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}


				

export default StartSeedlingsScreen
