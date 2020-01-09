import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity, AlertIOS, AsyncStorage, StyleSheet } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import base64 from 'base-64'

const iconImage = require('../assets/pocket-ponics.png')

const getAuthToken = async() => {

	var requestOptions = {
	  method: 'GET',
	  headers: new Headers({
	  	'Authorization': 'Bearer ' + 'lc9Bev3Bl5poBbDGZnb1cSGTZ75w/eBO0bB/5phTx4U=',
	  	'Content-Type': 'application/x-www-form-urlencoded'
	  }),
	  redirect: 'follow'
	}

	// get a token
	// var requestOptions = {
	//   method: 'GET',
	//   headers: new Headers({
	//   	'Authorization': 'Basic ' + base64.encode('test3@gmail.com:passwordtest3'),
	//   	'Content-Type': 'application/x-www-form-urlencoded'
	//   }),
	//   redirect: 'follow'
	// }

	// // create a user
	// var myHeaders = new Headers();
	// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	// var urlencoded = new URLSearchParams();
	// urlencoded.append("email", "test3@gmail.com");
	// urlencoded.append("password", "passwordtest3");

	// console.log(urlencoded)

	// var requestOptions = {
	//   method: 'POST',
	//   headers: myHeaders,
	//   body: "email=test3@gmail.com&password=passwordtest3",
	//   redirect: 'follow'
	// }

	fetch("http://10.171.204.187:8080/mobileapp/greenhouses/", requestOptions)
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
