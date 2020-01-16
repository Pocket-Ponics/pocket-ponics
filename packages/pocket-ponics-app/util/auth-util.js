import React from 'react'
import { Text,View, Image, TouchableOpacity, AlertIOS, AsyncStorage, StyleSheet } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import base64 from 'base-64'

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

		let token

		// APIUtil.getAuthToken(username, password)
		// 	.then(response => {
		// 		token = response.token
		// 		console.log('Token: ', token)

		// 		return APIUtil.getGreenhouses(token)
		// 	})
		// 	.then(response => {
		// 		const greenhouses = response.greenhouses

		// 		return Promise.all(greenhouses.map(
		// 			greenhouse => APIUtil.getGreenhouse(token, greenhouse)
		// 		))
		// 	})
		// 	.then(responses => {
		// 		return Promise.all([
		// 			AsyncStorage.setItem('token', token),
		// 			AsyncStorage.setItem('greenhouses', [
		// 				...responses, 
		// 				{
		// 					type: 'add-page',
		// 					name: "Setup",
		// 				}
		// 			])
		// 		])
		// 	})
		// 	.then(response => navigation.navigate('Greenhouse'))
		// 	.catch(error => {
		// 		console.log('error', error)

				// TODO - remove after the backend is pushed to AWS
				return Promise.all([
					AsyncStorage.setItem('token', 'mock-token'),
					AsyncStorage.setItem('greenhouses', JSON.stringify([
						{
							"name": "herewbanana",
							"water_level": 0,
							"nutrient_level": 0,
							"battery": 0,
							"light_level": 0,
							"power_source": 0,
							"seedling_time": "2020-01-12T00:00:00.000Z",
							"tiers": [
								{
									"tier": 1,
									"plant_id": 1,
									"ph_level": 0,
									"ec_level": 0,
									"water_level": 0,
									"cycle_time": null,
									"num_plants": 0
								},
								{
									"tier": 2,
									"plant_id": 4,
									"ph_level": 0,
									"ec_level": 0,
									"water_level": 0,
									"cycle_time": null,
									"num_plants": 0
								},
								{
									"tier": 3,
									"plant_id": 4,
									"ph_level": 0,
									"ec_level": 0,
									"water_level": 0,
									"cycle_time": null,
									"num_plants": 0
								},
								{
									"tier": 4,
									"plant_id": 4,
									"ph_level": 0,
									"ec_level": 0,
									"water_level": 0,
									"cycle_time": null,
									"num_plants": 0
								}
							]
						}, 
						{
							type: 'add-page',
							name: "Setup",
						}
					]))
				])
				.then(response => {
					return successFn()
				})
			//})
	}
}

export default AuthUtil
