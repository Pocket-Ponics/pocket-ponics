import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity, AlertIOS, AsyncStorage, StyleSheet } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import base64 from 'base-64'
import APIUtil from '../util/api-util'
import AuthUtil from '../util/auth-util'

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
		AuthUtil.getAuthToken(() => this.props.navigation.navigate('Login'), () => this.props.navigation.navigate('Greenhouse'))
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={styles.loginContainer}>
					<Image source={iconImage} style={styles.icon}/>
				</View>
			</View>
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
