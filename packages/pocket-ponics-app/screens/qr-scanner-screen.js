import React, { useEffect, useState } from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

import styles from './setup-styles'

const plugin = require('../assets/plug.jpg')

const QRScannerScreen = props => {
  	const [hasPermission, setHasPermission] = useState(null)

	useEffect(() => {
		(async () => {
			BarCodeScanner.req
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			setHasPermission(status === 'granted');
		})()
	}, [])

	const handleBarCodeScanned = ({ type, data }) => {
		console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
		props.navigation.navigate('Wifi')
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={styles.background}>
				<Text style={styles.heading}>Scan the QR Code</Text>
				<Text style={styles.text}>Scan the QR code on the side of the greenhouse.</Text>
				<BarCodeScanner
					onBarCodeScanned={handleBarCodeScanned}
					style={styles.scanner}/>
				<TouchableOpacity style={styles.cancelButton} onPress={()=> props.navigation.navigate('Greenhouse')}>
					<Text style={styles.cancelButtonText}>Cancel Setup</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}


				

export default QRScannerScreen