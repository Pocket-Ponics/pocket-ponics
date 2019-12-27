import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity, AlertIOS, AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from './setup-styles'

const iconImage = require('../assets/pocket-ponics.png')

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: null,
			password: null
		}
	}

	componentDidMount() {
		(async () => {
			try {
				const username = await AsyncStorage.getItem('username')
				const password = await AsyncStorage.getItem('password')
				this.props.navigation.navigate(username && password ? 'App' : 'Auth');
			} catch(e) {
				console.log(e)
			}
		})()
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.background}>
					<Image source={iconImage} style={styles.icon}/>
				</View>
			</SafeAreaView>
		)
	}
}

export default AuthLoadingScreen
