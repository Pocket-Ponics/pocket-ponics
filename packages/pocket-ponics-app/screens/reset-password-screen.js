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

import APIUtil from '../util/api-util'
import { TEXT_COLOR } from '../util/constants'

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './login-styles'

const iconImage = require('../assets/pocket-ponics.png')

class ResetPasswordScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			loading: false
		}

		this.onChangeUsername = this.onChangeUsername.bind(this)
		this.login = this.login.bind(this)
	}

	onChangeUsername(username) {
		this.setState({ username })
	}

	login() {
		if(this.state.username === ''){
			Alert.alert('Invalid username')
			return
		}

		this.setState({ loading: true })

		return APIUtil.resetPassword(this.state.username)
			.then(() => this.props.navigation.navigate('Login'))
			.catch(error => console.log('Reset Password Error', error))
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
					<TouchableOpacity onPress={this.login}>
						<Text style={styles.button}>Reset Password</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
						<Text style={styles.signUp}>Login</Text>
					</TouchableOpacity>
					<ActivityIndicator color={TEXT_COLOR} animating={this.state.loading}/>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default ResetPasswordScreen
