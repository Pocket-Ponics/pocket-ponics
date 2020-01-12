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

	APIUtil.getAuthToken('test3@gmail.com', 'passwordtest3')
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
