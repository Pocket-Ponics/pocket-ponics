import React from 'react'
import { 
	Text, 
	View, 
	Image,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Alert,
	Platform,
	AsyncStorage
} from 'react-native'

import * as Permissions from 'expo-permissions'

import APIUtil from '../util/api-util'
import { TEXT_COLOR } from '../util/constants'

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './login-styles'

const iconImage = require('../assets/pocket-ponics.png')

class LoginScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: ''
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
		if(this.state.username === '' || this.state.password === ''){
			Alert.alert('Invalid username or password')
			return
		}

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
			.then(() => Permissions.getAsync( Permissions.NOTIFICATIONS ))
			.then(response => {

				// Only ask if permissions have not already been determined, because
				// iOS won't necessarily prompt the user a second time.
				if (response.status !== 'granted') {
					// Android remote notification permissions are granted during the app
					// install, so this will only ask on iOS
					return Permissions.askAsync(Permissions.NOTIFICATIONS)
				}

				return response
			})
			.then(response => {
				if(response.status === 'granted') {
					return APIUtil.setDeviceKey(token)
				}
			})
			.then(response => {
				console.log('key time', response)
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
							name: 'Setup',
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
			<KeyboardAvoidingView style={styles.backgroundContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
				<View style={styles.loginContainer}>
					<Image source={iconImage} style={styles.icon}/>
					<View style={styles.inputContainer}>
						<Icon name={'ios-person'} size={28} color={TEXT_COLOR}
							style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder={'Email Address'}
							placeholderTextColor={TEXT_COLOR}
							value={this.state.username}
							onChangeText={this.onChangeUsername}
							autoCapitalize="none"
							textContentType="emailAddress"/>
					</View>
					<View style={styles.inputContainer}>
						<Icon name={'ios-lock'} size={28} color={TEXT_COLOR}
							style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder={'Password'}
							placeholderTextColor={TEXT_COLOR}
							value={this.state.password}
							onChangeText={this.onChangePassword}
							autoCapitalize="none"
							textContentType="password"
							secureTextEntry={true}
							onSubmitEditing={this.login}/>
					</View>
					<TouchableOpacity onPress={this.login}>
						<Text style={styles.button}>Log In</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
						<Text style={styles.signUp}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default LoginScreen