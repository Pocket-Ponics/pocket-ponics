import React from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import AuthUtil from '../util/auth-util'

import styles from './auth-loading-screen-styles'

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
			<View style={styles.backgroundContainer}>
				<View style={styles.loginContainer}>
					<Image source={iconImage} style={styles.icon}/>
					<ActivityIndicator color="#FFFFFF" />
				</View>
			</View>
		)
	}
}

export default AuthLoadingScreen
