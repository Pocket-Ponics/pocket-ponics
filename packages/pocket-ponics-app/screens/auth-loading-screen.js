import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity, AlertIOS, AsyncStorage, StyleSheet } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

const iconImage = require('../assets/pocket-ponics.png')

const getAuthToken = async() => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	var urlencoded = new URLSearchParams();
	urlencoded.append("email", "test3@gmail.com");
	urlencoded.append("password", "passwordtest3");

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: urlencoded,
	  redirect: 'follow'
	};

	fetch("http://10.171.204.187:8080/auth/create_user", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
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
		getAuthToken()
		// (async () => {
		// 	try {
		// 		const username = await AsyncStorage.getItem('username')
		// 		const password = await AsyncStorage.getItem('password')
		// 		console.log(username, password)
		// 		this.props.navigation.navigate(username && password ? 'App' : 'Login');
		// 	} catch(e) {
		// 		console.log(e)
		// 	}
		// })()
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
