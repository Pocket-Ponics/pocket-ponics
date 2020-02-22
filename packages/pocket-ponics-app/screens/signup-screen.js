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
	AsyncStorage,
	ActivityIndicator
} from 'react-native'

import APIUtil from '../util/api-util'
import AuthUtil from '../util/auth-util'
import { TEXT_COLOR } from '../util/constants'

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './login-styles'

const iconImage = require('../assets/pocket-ponics.png')
const emailVerifier = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

class SignUpScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			verifyPassword: '',
			loading: false
		}

		this.onChangeUsername = this.onChangeUsername.bind(this)
		this.onChangePassword = this.onChangePassword.bind(this)
		this.onChangeVerifyPassword = this.onChangeVerifyPassword.bind(this)
		this.signUp = this.signUp.bind(this)
	}

	onChangeUsername(username) {
		this.setState({ username })
	}

	onChangePassword(password) {
		this.setState({ password })
	}

	onChangeVerifyPassword(verifyPassword) {
		this.setState({ verifyPassword })
	}

	signUp() {
		if(this.state.password.length < 8) {
			Alert.alert('Passwords must be at least 8 characters')
			return
		}

		if(!emailVerifier.test(this.state.username)) {
			Alert.alert('Please enter a valid email')
			return
		}

		if(this.state.password !== this.state.verifyPassword) {
			Alert.alert('Passwords must match')
			return
		}

		this.setState({ loading: true })

		return AuthUtil.signUp(this.state.username, this.state.password)		
	}

	render() {
		const disabledStyle = { opacity: this.state.username === '' || this.state.password === '' ? 0.3 : 1 }

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
							placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
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
							placeholder={'Verify Password'}
							placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
							value={this.state.verifyPassword}
							onChangeText={this.onChangeVerifyPassword}
							autoCapitalize="none"
							textContentType="newPassword"
							secureTextEntry={true}
							onSubmitEditing={this.signUp}/>
					</View>
					<TouchableOpacity 
						onPress={this.signUp} 
						style={disabledStyle}
						disabled={this.state.username === '' || this.state.password === ''}>
						<Text style={styles.button}>Sign Up</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
						<Text style={styles.signUp}>Log In</Text>
					</TouchableOpacity>
					<ActivityIndicator color={TEXT_COLOR} animating={this.state.loading}/>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default SignUpScreen
