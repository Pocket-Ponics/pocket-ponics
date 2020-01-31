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
	ActivityIndicator
} from 'react-native'

import AuthUtil from '../util/auth-util'
import { TEXT_COLOR } from '../util/constants'

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './login-styles'

const iconImage = require('../assets/pocket-ponics.png')

class LoginScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			loading: false
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

		this.setState({ loading: true })

		return AuthUtil.login(this.state.username, this.state.password, () => this.props.navigation.navigate('Greenhouse'))
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
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Reset')}>
						<Text style={styles.signUp}>Reset Password</Text>
					</TouchableOpacity>
					<ActivityIndicator color={TEXT_COLOR} animating={this.state.loading}/>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default LoginScreen