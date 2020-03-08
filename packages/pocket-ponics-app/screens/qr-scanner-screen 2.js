import React, { useEffect, useState } from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './setup-styles'

const plugin = require('../assets/plug.jpg')

// TODO - set up wifi QR codes to follow the 'WIFI:T:WPA;S:<your Wi-Fi network name>;P:<your Wi-Fi network password>;;' pattern

class QRScannerScreen extends React.Component {
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
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Greenhouse' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	handleBarCodeScanned = ({ type, data }) => {
		console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Wifi' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	render(){
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.background}>
					<Text style={styles.heading}>Scan the QR Code</Text>
					<Text style={styles.text}>Scan the QR code on the side of the greenhouse.</Text>
					<BarCodeScanner
						onBarCodeScanned={this.handleBarCodeScanned.bind(this)}
						style={styles.scanner}/>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}


				

export default QRScannerScreen