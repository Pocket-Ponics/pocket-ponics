import { AsyncStorage, Alert } from 'react-native'
import * as Permissions from 'expo-permissions'

import APIUtil from '../util/api-util'

const generateDateString = (date) => {
	return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const AuthUtil = {
	async loadServerInfo() {
		const pastServers = JSON.parse(await AsyncStorage.getItem('serverInfo'))
		const currentServer = parseInt(await AsyncStorage.getItem('currentServer') || '-1', 10)

		console.log(pastServers)
		console.log(currentServer)

		if (currentServer !== -1) {
			global.host = pastServers[currentServer].host
			global.port = pastServers[currentServer].port
		}

		console.log(`Server: ${global.host}:${global.port}`)
	},
	async getAuthToken(loggedOutFn, successFn) {
		// Retrieve username and password from storage
		const username = await AsyncStorage.getItem('username')
		const password = await AsyncStorage.getItem('password')
		console.log(username, password)
		global.username = username

		// If the user is logged out, direct them to the login
		if(!username || !password) {
			return loggedOutFn()
		}

		let token
		AuthUtil.loadServerInfo()
			.then(() => APIUtil.getPlants())
			.then(response => {
				global.plants = {}
				response.forEach(plant => global.plants[plant.plant_id] = plant)

				return APIUtil.getAuthToken(username, password)
			})
			.then(response => {
				token = response.token
				console.log('Token: ', token)
				if(!token) {
					return loggedOutFn()
				}

				return AuthUtil.retrieveGreenhouses(token, successFn) 
			})
			.catch(error => {
				console.log('error', error)

				// TODO - remove after the backend is pushed to AWS
				return AuthUtil.runOfflineTestingCode(username, password, successFn)
			})
	},
	retrieveGreenhouses(token, successFn) {
		let greenhouseIds
		let greenhouseData
		return APIUtil.getGreenhouses(token)
			.then(response => {
				greenhouseIds = response.greenhouses

				return Promise.all(greenhouseIds.map(
					greenhouse => APIUtil.getGreenhouse(token, greenhouse)
				))
			})
			.then(responses => {
				greenhouseData = responses
				const start = generateDateString(new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)))
				const end = generateDateString(new Date(Date.now()))

				return Promise.all(greenhouseIds.map(
					greenhouse => APIUtil.getHistory(token, greenhouse, start, end)
				))
			})
			.then(responses => {
				global.greenhouses = {}
				greenhouseData.forEach((greenhouse, index) => {
					greenhouse.history = responses[index].history
					global.greenhouses[greenhouse.greenhouse_id] = greenhouse
				})
				
				return Promise.all([
					AsyncStorage.setItem('token', token),
					AsyncStorage.setItem('greenhouses', JSON.stringify([
						...greenhouseData, 
						{
							type: 'add-page',
							name: 'Setup',
						}
					]))
				])
			})
			.then(() => successFn())
			.catch(error => console.log('Data retrieval error', error))
	},
	login(username, password, successFn) {
		let token
		AuthUtil.loadServerInfo()
			.then(() => APIUtil.getPlants())
			.then(response => {
				global.plants = {}
				response.forEach(plant => global.plants[plant.plant_id] = plant)

				return APIUtil.getAuthToken(username, password)
			})
			.then(response => {
				if(!response.token) {
					Alert.alert('Invalid username or password')
					return Promise.reject('Invalid username or password')
				}

				token = response.token
				console.log('Token: ', token)

				global.username = username
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
			.then(() => AuthUtil.retrieveGreenhouses(token, successFn))
			.catch(error => {
				console.log('Error in Login', error)
				return Alert.alert('Unable to access server: Pocket \'Ponics requires internet access')
			})
	},
	signUp(username, password) {
		AuthUtil.loadServerInfo()
			.then(() => APIUtil.createUser(username, password))
			.then(response => {
				if(response['202']) {
					Alert.alert('Username already exists')
					return Promise.reject('Username already exists')
				}

				if(!response['200']) {
					Alert.alert('Error signing up')
					return Promise.reject('Sign Up error: ' + JSON.stringify(response))
				}

				global.username = username
				return Promise.all([
					AsyncStorage.setItem('username', username),
					AsyncStorage.setItem('password', password)
				])
			})
			.then(() => AuthUtil.login(this.state.username, this.state.password, () => this.props.navigation.navigate('Greenhouse')))
			.catch(error => {
				console.log('Error in Signup', error)
				return Alert.alert('Unable to access server: Pocket \'Ponics requires internet access')
			})
	},
	// TODO - remove after the backend is pushed to AWS
	runOfflineTestingCode(username, password, successFn) {
		global.plants = {};
		[
			{
				'plant_id': 1,
				'ph_level_low': null,
				'ec_level_low': null,
				'temp_low': null,
				'cycle_time': null,
				'ph_level_high': null,
				'ec_level_high': null,
				'temp_high': null,
				'name': '',
				'light_time': null,
				'steps': null,
				'plant_url': null,
				'harvest_url': null,
				'num_plants': null
			},
			{
				'plant_id': 2,
				'ph_level_low': 6,
				'ec_level_low': 2,
				'temp_low': 0,
				'cycle_time': 65,
				'ph_level_high': 6.5,
				'ec_level_high': 4,
				'temp_high': 0,
				'name': 'Green Beans',
				'light_time': 12,
				'steps': 'With one hand, hold the stem of the plant. With the other hand, grasp the top of the green bean firmly. gently pull the pod away from the stem, breaking it off the vine.',
				'plant_url': null,
				'harvest_url': null,
				'num_plants': 8
			},
			{
				'plant_id': 3,
				'ph_level_low': 5.5,
				'ec_level_low': 1.8,
				'temp_low': 0,
				'cycle_time': 60,
				'ph_level_high': 6.6,
				'ec_level_high': 2.3,
				'temp_high': 0,
				'name': 'Spinach',
				'light_time': 10,
				'steps': 'To harvest your spinach, you will need a pair of scissors. Simply cut off the leaves as close to the root as you can. Your spinach plant will continue regrowing these leaves until you decide to remove the entire plant.',
				'plant_url': null,
				'harvest_url': null,
				'num_plants': 18
			},
			{
				'plant_id': 4,
				'ph_level_low': 6,
				'ec_level_low': 1.8,
				'temp_low': 0,
				'cycle_time': 45,
				'ph_level_high': 6.5,
				'ec_level_high': 2.4,
				'temp_high': 0,
				'name': 'Turnip',
				'light_time': 12,
				'steps': 'Remove the turnip from the tier. With a pair of scissors, cut the leaves off the root, and remove any dangling roots.',
				'plant_url': 'https://lh3.googleusercontent.com/HvTSEJ6TtVkSl0EV11E-L-cQ5jQrIUr9A_KRzCek1WDlswBLpav5PT836DcocoDKaG-IGqgU0ZunVnd_3NQZxXEThwq26yQUNikDox4d-LlZ1jQuwA=w1280',
				'harvest_url': 'https://lh4.googleusercontent.com/H-8W1ypQLpiFElIqjlHeKU2skb5d-e8d547m0K4ZzjagdHGLEbHZqJy5ws6DttMA_bF3hiZi=w1280',
				'num_plants': 18
			},
			{
				'plant_id': 5,
				'ph_level_low': 5.5,
				'ec_level_low': 2,
				'temp_low': 0,
				'cycle_time': 84,
				'ph_level_high': 6.5,
				'ec_level_high': 5,
				'temp_high': 0,
				'name': 'Tomato',
				'light_time': 10,
				'steps': 'With one hand, hold the stem of the plant. With the other hand, grasp the fuit firmly yet gently. Twist the fruit away from the stem, breaking the stalk just above the top of the tomato.',
				'plant_url': null,
				'harvest_url': null,
				'num_plants': 1
			}
		].forEach(plant => global.plants[plant.plant_id] = plant)
		
		global.greenhouses = {};
		[
			{
				'name': 'herewbanana',
				'greenhouse_id': 1,
				'water_level': 0,
				'nutrient_level': 0,
				'battery': 0,
				'light_level': 0,
				'power_source': 0,
				'seedling_time': '2020-01-12T00:00:00.000Z',
				'tiers': [
					{
						'tier': 1,
						'plant_id': 5,
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
				],
				history: []
			}
		].forEach((greenhouse) => {
			global.greenhouses[greenhouse.greenhouse_id] = greenhouse
		})
		return Promise.all([
			AsyncStorage.setItem('username', username),
			AsyncStorage.setItem('password', password),
			AsyncStorage.setItem('token', 'mock-token'),
		])
			.then(() => {
				return successFn()
			})
	}
}

export default AuthUtil
