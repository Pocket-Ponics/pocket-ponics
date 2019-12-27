import React from 'react';
import { Text,View, SafeAreaView, Image, TouchableOpacity, AlertIOS } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './setup-styles'

const plugin = require('../assets/plug.jpg')

class ProfileScreen extends React.Component {
	static navigationOptions = {
		title: 'Profile',
	}

	changePassword(){
		AlertIOS.prompt(
			'Enter your new password'
		)
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.background}>
					<Text style={styles.text}>Username: demouser</Text>
					<Text style={styles.text}>Greenhouses: 2</Text>
					<Text style={styles.text}>Last login: 1/2/2020</Text>
					<TouchableOpacity style={styles.button} onPress={this.changePassword.bind(this)}>
						<Text style={styles.buttonText}>Change password</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Auth')}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}

export default ProfileScreen
