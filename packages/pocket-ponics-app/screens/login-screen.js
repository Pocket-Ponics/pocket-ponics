import React, { Component } from 'react'
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	TextInput,
	Dimensions,
	TouchableOpacity,
	KeyboardAvoidingView,
	Alert,
	Button,
	Platform,
	AsyncStorage
} from 'react-native'
import APIUtil from '../util/api-util'

// import bgImage from './background.png'
import Icon from 'react-native-vector-icons/Ionicons'
const iconImage = require('../assets/pocket-ponics.png')

const { width: WIDTH } = Dimensions.get('window')
class LoginScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		}

		this.onChangeUsername = this.onChangeUsername.bind(this)
		this.onChangePassword = this.onChangePassword.bind(this)
		this.login = this.login.bind(this)
	}

	onChangeUsername(username) {
		this.setState({ username })
	}

	onChangePassword(password) {
		this.setState({ password })
	}

	login() {
		let token
		APIUtil.getAuthToken(this.state.username, this.state.password)
			.then(response => {
				if(!response.token) {
					Alert.alert('Invalid username or password')
					return Promise.reject('Invalid username or password')
				}

				token = response.token
				console.log('Token: ', token)
				return Promise.all([
					AsyncStorage.setItem('username', this.state.username),
					AsyncStorage.setItem('password', this.state.password)
				])
			})
			.then(response => {
				return APIUtil.getGreenhouses(token)
			})
			.then(response => {
				const greenhouses = response.greenhouses

				return Promise.all(greenhouses.map(
					greenhouse => APIUtil.getGreenhouse(token, greenhouse)
				))
			})
			.then(responses => {
				this.props.navigation.navigate('Greenhouse', { retrievedData: { 
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

	render() {
		return (
			<KeyboardAvoidingView style={styles.backgroundContainer} behavior={Platform.OS === "ios" ? "padding" : null}>
				<View style={styles.loginContainer}>
					<Image source={iconImage} style={styles.icon}/>
					<View style={styles.inputContainer}>
						<Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.2)'}
							style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder={'Username'}
							placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
							value={this.state.username}
							onChangeText={this.onChangeUsername}
							autoCapitalize="none"
							textContentType="username"/>
					</View>
					<View style={styles.inputContainer}>
						<Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.2)'}
							style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder={'Password'}
							placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
							value={this.state.password}
							onChangeText={this.onChangePassword}
							autoCapitalize="none"
							textContentType="password"
							secureTextEntry={true}
							onSubmitEditing={this.login}/>
					</View>
					<TouchableOpacity onPress={this.login}>
						<Text style={styles.button}>LOGIN</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
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
	inputContainer: {
		marginTop: 30,
		alignItems: 'center'
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 45,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'rgba(0, 0, 0, 0.35)',
		color: 'rgba(255, 255, 255, 0.7)',
		marginHorizontal: 30
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37
	},
	button: {
		backgroundColor: '#638E4E',
		width: WIDTH - 55,
		borderRadius: 22,
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold',
		overflow: 'hidden',
		padding: 12,
		textAlign:'center',
		marginTop: 30
	}
});

export default LoginScreen