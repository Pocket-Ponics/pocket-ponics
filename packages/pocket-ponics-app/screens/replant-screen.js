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

class ReplantScreen extends React.Component {
	async goToNext() {
		const token = await AsyncStorage.getItem('token')

		const plantId = this.props.navigation.getParam('id')
		const greenhouseId = this.props.navigation.getParam('greenhouseId')
		const greenhouseName = this.props.navigation.getParam('greenhouseName')

		APIUtil.plantSeedlings(token, greenhouseId, greenhouseName)
			.then(response => {
				console.log('Greenhouse registration response: ', response)
				console.log('Greenhouse: ', response.id)
				return APIUtil.postTier(token, response.id, 1, plantId, global.plants[plantId].num_plants || 0, global.plants[plantId].cycle_time)
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
		const plantId = this.props.navigation.getParam('id')
		const seedsArray = (new Array(global.plants[plantId].num_plants || 1)).fill(plantId)
		console.log(plantId, seedsArray)
		
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


				

export default ReplantScreen
