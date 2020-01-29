import { AsyncStorage, Alert } from 'react-native'
import * as Permissions from 'expo-permissions'

import APIUtil from '../util/api-util'

const AuthUtil = {
	getAuthToken: async(loggedOutFn, successFn) => {

		// Retrieve username and password from storage
		const username = await AsyncStorage.getItem('username')
		const password = await AsyncStorage.getItem('password')
		console.log(username, password)

		// If the user is logged out, direct them to the login
		if(!username || !password) {
			return loggedOutFn()
		}

		global.plants = {}
		const plantData = await APIUtil.getPlants()
		plantData.forEach(plant => global.plants[plant.plant_id] = plant)

		let token
		APIUtil.getAuthToken(username, password)
			.then(response => {
				token = response.token
				console.log('Token: ', token)

				return APIUtil.getGreenhouses(token)
			})
			.then(response => {
				const greenhouses = response.greenhouses

				return Promise.all(greenhouses.map(
					greenhouse => APIUtil.getGreenhouse(token, greenhouse)
				))
			})
			.then(responses => {
				return Promise.all([
					AsyncStorage.setItem('token', token),
					AsyncStorage.setItem('greenhouses', JSON.stringify([
						...responses, 
						{
							type: 'add-page',
							name: 'Setup',
						}
					]))
				])
			})
			.then(() => successFn())
			.catch(error => {
				console.log('error', error)

				// TODO - remove after the backend is pushed to AWS
				return AuthUtil.runOfflineTestingCode(username, password, successFn)
			})
	},
	login(username, password, successFn) {
		let token
		APIUtil.getAuthToken(username, password)
			.then(response => {
				if(!response.token) {
					Alert.alert('Invalid username or password')
					return Promise.reject('Invalid username or password')
				}

				token = response.token
				console.log('Token: ', token)
				return Promise.all([
					AsyncStorage.setItem('username', username),
					AsyncStorage.setItem('password', password)
				])
			})
			.then(() => Permissions.getAsync( Permissions.NOTIFICATIONS ))
			.then(response => {

				// Only ask if permissions have not already been determined, because
				// iOS won't necessarily prompt the user a second time.
				if (response.status !== 'granted') {
					// Android remote notification permissions are granted during the app
					// install, so this will only ask on iOS
					return Permissions.askAsync(Permissions.NOTIFICATIONS)
				}

				return response
			})
			.then(response => {
				if(response.status === 'granted') {
					return APIUtil.setDeviceKey(token)
				}
			})
			.then(response => {
				console.log('key time', response)
				return APIUtil.getGreenhouses(token)
			})
			.then(response => {
				console.log(greenhouses)
				const greenhouses = response.greenhouses

				return Promise.all(greenhouses.map(
					greenhouse => APIUtil.getGreenhouse(token, greenhouse)
				))
			})
			.then(responses => {
				return Promise.all([
					AsyncStorage.setItem('token', token),
					AsyncStorage.setItem('greenhouses', JSON.stringify([
						...responses, 
						{
							type: 'add-page',
							name: 'Setup',
						}
					]))
				])
			})
			.then(() => {
				this.props.navigation.navigate('Greenhouse')
			})
			.catch(error => {
				console.log('error in code', error)
				// TODO - remove after the backend is pushed to AWS
				return AuthUtil.runOfflineTestingCode(username, password, successFn)
			})
	},
	// TODO - remove after the backend is pushed to AWS
	runOfflineTestingCode(username, password, successFn) {
		return Promise.all([
			AsyncStorage.setItem('username', username),
			AsyncStorage.setItem('password', password),
			AsyncStorage.setItem('token', 'mock-token'),
			AsyncStorage.setItem('greenhouses', JSON.stringify([
				{
					'name': 'herewbanana',
					'water_level': 0,
					'nutrient_level': 0,
					'battery': 0,
					'light_level': 0,
					'power_source': 0,
					'seedling_time': '2020-01-12T00:00:00.000Z',
					'tiers': [
						{
							'tier': 1,
							'plant_id': 1,
							'ph_level': 0,
							'ec_level': 0,
							'water_level': 0,
							'cycle_time': null,
							'num_plants': 0
						},
						{
							'tier': 2,
							'plant_id': 4,
							'ph_level': 0,
							'ec_level': 0,
							'water_level': 0,
							'cycle_time': null,
							'num_plants': 0
						},
						{
							'tier': 3,
							'plant_id': 4,
							'ph_level': 0,
							'ec_level': 0,
							'water_level': 0,
							'cycle_time': null,
							'num_plants': 0
						},
						{
							'tier': 4,
							'plant_id': 4,
							'ph_level': 0,
							'ec_level': 0,
							'water_level': 0,
							'cycle_time': null,
							'num_plants': 0
						}
					]
				}, 
				{
					type: 'add-page',
					name: 'Setup',
				}
			]))
		])
			.then(() => {
				return successFn()
			})
	}
}

export default AuthUtil
