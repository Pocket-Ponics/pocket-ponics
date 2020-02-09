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

		let greenhouseId
		APIUtil.postGreenhouse(token, name)
			.then(response => {
				console.log('Greenhouse registration response: ', response)
				console.log('Greenhouse: ', response.id)
				greenhouseId = response.id
				return Promise.all([
					APIUtil.postTier(token, response.id, 1, tiers[0].plant_id, tiers[0].num_plants || 0, tiers[0].cycle_time),
					APIUtil.postTier(token, response.id, 2, tiers[1].plant_id, tiers[1].num_plants || 0, tiers[1].cycle_time),
					APIUtil.postTier(token, response.id, 3, tiers[2].plant_id, tiers[2].num_plants || 0, tiers[2].cycle_time),
					APIUtil.postTier(token, response.id, 4, tiers[3].plant_id, tiers[3].num_plants || 0, tiers[3].cycle_time)
				])
			})
			.then(response => {
				console.log('Tier registration response: ', response)
				const seedlingHarvest = new Date(Date.now() + (24 * 3600 * 1000 * 14))
				const dateString = seedlingHarvest.getFullYear() + '-' + (seedlingHarvest.getMonth()+1) + '-' + seedlingHarvest.getDate() + 'T00:00:00.000Z'
				const plant1 = new Date(Date.now() + (24 * 3600 * 1000 * tiers[0].cycle_time))
				const date1 = plant1.getFullYear() + '-' + (plant1.getMonth()+1) + '-' + plant1.getDate() + 'T00:00:00.000Z'
				const plant2 = new Date(Date.now() + (24 * 3600 * 1000 * tiers[1].cycle_time))
				const date2 = plant2.getFullYear() + '-' + (plant2.getMonth()+1) + '-' + plant2.getDate() + 'T00:00:00.000Z'
				const plant3 = new Date(Date.now() + (24 * 3600 * 1000 * tiers[2].cycle_time))
				const date3 = plant3.getFullYear() + '-' + (plant3.getMonth()+1) + '-' + plant3.getDate() + 'T00:00:00.000Z'
				const plant4 = new Date(Date.now() + (24 * 3600 * 1000 * tiers[3].cycle_time))
				const date4 = plant4.getFullYear() + '-' + (plant4.getMonth()+1) + '-' + plant4.getDate() + 'T00:00:00.000Z'
		
		
				const newGreenhouse = {
					name,
					'greenhouse_id': greenhouseId,
					'water_level': 0,
					'nutrient_level': 0,
					'battery': 0,
					'light_level': 0,
					'power_source': 0,
					'seedling_time': dateString,
					'tiers': [
						{
							'tier': 1,
							'plant_id': tiers[0].plant_id,
							'ph_level': 0,
							'ec_level': 0,
							'water_level': 0,
							'cycle_time': date1,
							'num_plants': tiers[0].num_plants
						},
						{
							'tier': 2,
							'plant_id': tiers[1].plant_id,
							'ph_level': 0,
							'ec_level': 0,
							'water_level': 0,
							'cycle_time': date2,
							'num_plants': tiers[1].num_plants
						},
						{
							'tier': 3,
							'plant_id': tiers[2].plant_id,
							'ph_level': 0,
							'ec_level': 0,
							'water_level': 0,
							'cycle_time': date3,
							'num_plants': tiers[2].num_plants
						},
						{
							'tier': 4,
							'plant_id': tiers[3].plant_id,
							'ph_level': 0,
							'ec_level': 0,
							'water_level': 0,
							'cycle_time': date4,
							'num_plants': tiers[3].num_plants
						}
					],
					history: []
				}
				global.greenhouses[greenhouseId] = newGreenhouse
				return this.props.navigation.navigate('Greenhouse')
			})
			.catch(error => {
				console.log('error', error)
				// TODO - remove after the backend is pushed to AWS
				return this.props.navigation.navigate('Greenhouse')
			})
	}

	cancel() {
		this.props.navigation.navigate('Greenhouse')
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
		const seedsArray = this.state.tiers.flatMap(tier => (new Array(tier.num_plants || 1)).fill(tier.plant_id))
		
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
