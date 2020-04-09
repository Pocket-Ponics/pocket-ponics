import React from 'react'
import { Text, FlatList, View, TouchableOpacity, AlertIOS } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { StackActions, NavigationActions } from 'react-navigation'

import APIUtil from '../util/api-util'

import styles from './setup-styles'

class WifiScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	goToNext() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ 
				routeName: 'TierSelection'
			})],
		})
		this.props.navigation.dispatch(resetAction)
	}

	cancel() {
		return this.props.navigation.navigate('Greenhouse')
	}

	sendToGreenhouse(wifiData) {
		APIUtil.sendWifiData(wifiData)
			.then(() => this.goToNext())
			.catch(error => {
				console.log('Wifi Registration Error', error)

				// TODO - remove after demo
				this.goToNext()

				// Alert.alert('Unable to connect to wifi, please try again')
			})
	}

	setWifi(wifiData) {
		console.log('wifiData', wifiData)

		if (wifiData.encrypted) {
			AlertIOS.prompt(
				'Enter WiFi password',
				null,
				password => this.sendToGreenhouse({ ... wifiData, password })
			)
		} else {
			this.sendToGreenhouse(wifiData)
		}
		
	}

	renderWifi(wifiData) {
		return (
			<TouchableOpacity style={styles.wifi} onPress={this.setWifi.bind(this, wifiData)}>
				<Text style={styles.wifiText}>{wifiData.ssid}</Text>
				{wifiData.encrypted ? <FontAwesome name="lock" size={20} color="white"/> : null }
				<FontAwesome name="wifi" size={20} color="white"/>
			</TouchableOpacity>
		)
	}

	render() {
		const wifiData = this.props.navigation.getParam('wifis', [])

		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Select a WiFi network</Text>
					<FlatList
						data={wifiData}
						renderItem={({ item }) => this.renderWifi(item)}
						keyExtractor={item => item.ssid}
						style={styles.wifiList}/>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default WifiScreen