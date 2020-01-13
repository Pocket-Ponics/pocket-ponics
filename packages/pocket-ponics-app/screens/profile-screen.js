import React from 'react';
import { Text,View, SafeAreaView, Image, TouchableOpacity, AlertIOS, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './setup-styles'

const plugin = require('../assets/plug.jpg')

class ProfileScreen extends React.Component {
	static navigationOptions = {
		title: 'Profile',
	}

	changePassword(){
		(async () => {
			try {
				const retrievedData = this.props.navigation.getParam('retrievedData', { greenhouses: [] })
				const username = await AsyncStorage.getItem('username', '')
				const password = await AsyncStorage.getItem('password', '')
				console.log('here')
				return this.props.navigation.navigate('ChangePassword', { 
					username, 
					password,
					token: retrievedData.token })
			} catch(e) {
				console.log(e)
			}
		})()
	}

	logout() {
		(async () => {
			try {
				const username = await AsyncStorage.setItem('username', '')
				const password = await AsyncStorage.setItem('password', '')
				return this.props.navigation.navigate('Auth')
			} catch(e) {
				console.log(e)
			}
		})()
	}

	render() {
		const retrievedData = this.props.navigation.getParam('retrievedData', { greenhouses: [] })
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.background}>
					<Text style={styles.text}>Username: demouser</Text>
					<Text style={styles.text}>Greenhouses: {retrievedData.greenhouses.length - 1}</Text>
					<TouchableOpacity style={styles.button} onPress={this.changePassword.bind(this)}>
						<Text style={styles.buttonText}>Change password</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={this.logout.bind(this)}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}

export default ProfileScreen
