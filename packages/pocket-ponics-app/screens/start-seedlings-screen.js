import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import APIUtil from '../util/api-util'

import styles from './setup-styles'

import { 
	TOMATO_ID, 
	GREENBEAN_ID, 
	SPINACH_ID,
	TURNIP_ID,
	TOMATO_VALUES,
	GREENBEAN_VALUES,
	SPINACH_VALUES,
	TURNIP_VALUES,
	ONE_DAY
} from '../util/constants'

const plugin = require('../assets/plug.jpg')
const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

const seedsArray = [
	...(new Array(2)).fill(TOMATO_ID),
	...(new Array(8)).fill(GREENBEAN_ID),
	...(new Array(20)).fill(SPINACH_ID),
	...(new Array(20)).fill(TURNIP_ID)
]

class StartSeedlingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	async goToNext() {
		const name = this.props.navigation.getParam('name', "")
		const serialNo = this.props.navigation.getParam('serialNo', "")
		const password = this.props.navigation.getParam('password', "")
		const token = this.props.navigation.getParam('token', "")
		const tiers = this.props.navigation.getParam('tiers', [null, null, null, null])
		console.log(tiers)

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
		const tiers = this.props.navigation.getParam('tiers', [{}, {}, {}, {}])
		const seedsArray = [
			...(new Array(tiers[0].num_plants)).fill(tiers[0].plant_id),
			...(new Array(tiers[1].num_plants)).fill(tiers[1].plant_id),
			...(new Array(tiers[2].num_plants)).fill(tiers[2].plant_id),
			...(new Array(tiers[3].num_plants)).fill(tiers[3].plant_id),
		]
		return (
			<SafeAreaView style={{flex: 1}}>
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
			</SafeAreaView>
		)
	}
}


				

export default StartSeedlingsScreen
