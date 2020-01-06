import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity, AlertIOS, AsyncStorage, StyleSheet } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

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
				console.log(username, password)
				this.props.navigation.navigate(username && password ? 'App' : 'Login');
			} catch(e) {
				console.log(e)
			}
		})()
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
