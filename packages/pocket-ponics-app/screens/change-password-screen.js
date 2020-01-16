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
import APIUtil from '../util/api-util'
import { TEXT_COLOR } from '../util/constants'

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './login-styles'

const iconImage = require('../assets/pocket-ponics.png')

class SignUpScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			oldPassword: '',
			password: '',
			verifyPassword: ''
		}

		this.onChangeOldPassword = this.onChangeOldPassword.bind(this)
		this.onChangePassword = this.onChangePassword.bind(this)
		this.onChangeVerifyPassword = this.onChangeVerifyPassword.bind(this)
		this.changePassword = this.changePassword.bind(this)
	}

	onChangeOldPassword(oldPassword) {
		this.setState({ oldPassword })
	}

	onChangePassword(password) {
		this.setState({ password })
	}

	onChangeVerifyPassword(verifyPassword) {
		this.setState({ verifyPassword })
	}

	changePassword() {
		if(this.state.password.length < 8) {
			Alert.alert('Passwords must be at least 8 characters')
			return
		}

		if(this.state.password !== this.state.verifyPassword) {
			Alert.alert('Passwords must match')
			return
		}

		const username = this.props.navigation.getParam('username', '')
		const token = this.props.navigation.getParam('token', '')

		APIUtil.changePassword(token, username, this.state.oldPassword, this.state.password)
			.then(response => {
				if(!response['200']) {
					Alert.alert('Unable to change password')
					return Promise.reject('Unable to change password: ' + JSON.stringify(response))
				}

				return Promise.all([
					AsyncStorage.setItem('username', ''),
					AsyncStorage.setItem('password', '')
				])
			})
			.then(() => this.props.navigation.navigate('Auth'))
			.catch(error => {
				console.log('error', error)
			})
	}

	render() {
		const disabledStyle = { opacity: this.state.password === '' ? 0.3 : 1 }

		return (
			<KeyboardAvoidingView style={styles.backgroundContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
				<View style={styles.loginContainer}>
					<Image source={iconImage} style={styles.icon}/>
					<View style={styles.inputContainer}>
						<Icon name={'ios-lock'} size={28} color={TEXT_COLOR}
							style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder={'Old Password'}
							placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
							value={this.state.oldPassword}
							onChangeText={this.onChangeOldPassword}
							autoCapitalize="none"
							textContentType="password"
							secureTextEntry={true}/>
					</View>
					<View style={styles.inputContainer}>
						<Icon name={'ios-lock'} size={28} color={TEXT_COLOR}
							style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder={'New Password'}
							placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
							value={this.state.password}
							onChangeText={this.onChangePassword}
							autoCapitalize="none"
							textContentType="newPassword"
							secureTextEntry={true}/>
					</View>
					<View style={styles.inputContainer}>
						<Icon name={'ios-lock'} size={28} color={TEXT_COLOR}
							style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder={'Verify New Password'}
							placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
							value={this.state.verifyPassword}
							onChangeText={this.onChangeVerifyPassword}
							autoCapitalize="none"
							textContentType="newPassword"
							secureTextEntry={true}
							onSubmitEditing={this.changePassword}/>
					</View>
					<TouchableOpacity 
						onPress={this.changePassword} 
						style={disabledStyle}
						disabled={this.state.password === ''}>
						<Text style={styles.button}>Change Password</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default SignUpScreen
