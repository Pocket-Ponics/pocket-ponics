import React, { useEffect, useState } from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from './setup-styles'

const plugin = require('../assets/settings-screen.png')

class NetworkConnectionScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	constructor(props) {
		super(props)

		this.state = {
			hasPermission: null
		}
	}

	onMount() {
		(async () => {
			BarCodeScanner.req
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			this.setState({ hasPermission: status === 'granted'});
		})()
	}

	cancel() {
		return this.props.navigation.navigate('Auth')
	}

	handleBarCodeScanned = ({ type, data }) => {
		const token = this.props.navigation.getParam('token', "")
		console.log('qrscanner', token)
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ 
				routeName: 'Wifi',
				params: { token } 
			})],
		})
		this.props.navigation.dispatch(resetAction);
	}

	render(){
		return (
			<View style={{flex: 1}}>
				<View style={styles.background}>
					<Text style={styles.heading}>Connect to the Greenhouse Network</Text>
					<Text style={styles.text}>Go to Settings > WIFI on your phone and connect to the PONICS network.</Text>
					<Image source={plugin} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={this.handleBarCodeScanned.bind(this)}>
						<Text style={styles.buttonText}>Continue Setup</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}		

export default NetworkConnectionScreen
