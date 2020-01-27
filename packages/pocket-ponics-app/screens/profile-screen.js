import React from 'react'
import { Text,View, TouchableOpacity, AsyncStorage } from 'react-native'

import styles from './setup-styles'

class ProfileScreen extends React.Component {
	static navigationOptions = {
		title: 'Profile',
	}

	changePassword(){
		(async () => {
			try {
				const username = await AsyncStorage.getItem('username', '')
				const password = await AsyncStorage.getItem('password', '')
				const token = await AsyncStorage.getItem('token', '')
				return this.props.navigation.navigate('ChangePassword', { 
					username, 
					password,
					token })
			} catch(e) {
				console.log(e)
			}
		})()
	}

	logout() {
		(async () => {
			try {
				await AsyncStorage.setItem('username', '')
				await AsyncStorage.setItem('password', '')
				return this.props.navigation.navigate('Auth')
			} catch(e) {
				console.log(e)
			}
		})()
	}

	render() {
		const greenhouses = this.props.navigation.getParam('greenhouses', [])
		const username = this.props.navigation.getParam('username', '')

		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.text}>Username: {username}</Text>
					<Text style={styles.text}>Greenhouses: {greenhouses.length - 1}</Text>
					<TouchableOpacity style={styles.button} onPress={this.changePassword.bind(this)}>
						<Text style={styles.buttonText}>Change password</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={this.logout.bind(this)}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default ProfileScreen
