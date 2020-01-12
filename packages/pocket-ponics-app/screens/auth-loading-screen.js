import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity, AlertIOS, AsyncStorage, StyleSheet } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import base64 from 'base-64'
import APIUtil from '../util/api-util'

const iconImage = require('../assets/pocket-ponics.png')

const getAuthToken = async(navigation) => {
	// Retrieve username and password from storage
	const username = await AsyncStorage.getItem('username')
	const password = await AsyncStorage.getItem('password')
	console.log(username, password)

	// If the user is logged out, direct them to the login
	if(!username || !password) {
		navigation.navigate('Login')
		return
	}

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
			navigation.navigate('Greenhouse', { retrievedData: { 
				token, 
				greenhouses: [
					...responses, 
					{
						type: 'add-page',
						name: "Setup",
					}
				] 
			}})
		})
		.catch(error => {
			console.log('error', error)
			// TODO - Remove the dummy demo data when the server is hosted on AWS
			navigation.navigate('Greenhouse', { retrievedData: { 
				token: "mock-token", 
				greenhouses: [
					{
						"name": "SuperTest",
						"water_level": 78,
						"nutrient_level": 91,
						"battery": 83,
						"light_level": 0,
						"power_source": 0,
						"seedling_time": null,
						"tiers": [
							{
								"tier": 1,
								"plant_id": 1,
								"ph_level": 5.6,
								"ec_level": 2.0,
								"water_level": 0,
								"cycle_time": "00:00:16",
								"num_plants": 1
							},
							{
								"tier": 2,
								"plant_id": 3,
								"ph_level": 6.0,
								"ec_level": 1.5,
								"water_level": 0,
								"cycle_time": "00:00:16",
								"num_plants": 18
							},
							{
								"tier": 3,
								"plant_id": 3,
								"ph_level": 6.0,
								"ec_level": 2.0,
								"water_level": 0,
								"cycle_time": "00:00:16",
								"num_plants": 18
							},
							{
								"tier": 4,
								"plant_id": 3,
								"ph_level": 6.0,
								"ec_level": 2.0,
								"water_level": 0,
								"cycle_time": "00:00:00",
								"num_plants": 18
							}
						]
					}, 
					{
						type: 'add-page',
						name: "Setup",
					}
				] 
			}})
		})
}

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: null,
			password: null
		}
	}

	componentDidMount() {
		getAuthToken(this.props.navigation)
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.loginContainer}>
					<Image source={iconImage} style={styles.icon}/>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({  
	backgroundContainer: {
		flex: 1
	},
	loginContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 100
	},
	icon: {
		height: 200,
		resizeMode: 'contain',
	},
})

export default AuthLoadingScreen
