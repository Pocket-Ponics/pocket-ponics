import { AsyncStorage, Alert } from 'react'
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

		let token

		APIUtil.getAuthToken(username, password)
			.then(response => {
				token = response.token
				console.log('Token: ', token)

				return //APIUtil.getGreenhouses(token)
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
			.then(responses => {
				return Promise.all([
					AsyncStorage.setItem('token', token)
					
				])
			})
			.then(() => {
				this.props.navigation.navigate('Admin')
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
			AsyncStorage.setItem('token', 'mock-token')
		])
			.then(() => {
				return successFn()
			})
	}
}

export default AuthUtil