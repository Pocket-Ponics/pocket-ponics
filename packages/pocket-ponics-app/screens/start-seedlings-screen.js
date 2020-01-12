import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import APIUtil from '../util/api-util'

import styles from './setup-styles'

const plugin = require('../assets/plug.jpg')

class StartSeedlingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	async goToNext() {
		const name = this.props.navigation.getParam('name', "")
		const serialNo = this.props.navigation.getParam('serialNo', "")
		const password = this.props.navigation.getParam('password', "")
		const token = this.props.navigation.getParam('token', "")
		const tiers = this.props.navigation.getParam('tiers', [null, null, null, null])

		APIUtil.postGreenhouse(token, name)
			.then(response => {
				console.log('Greenhouse registration response: ', response)
				console.log('Greenhouse: ', response.id)
				return Promise.all([
					APIUtil.postTier(token, response.id, 1, tiers[0]['plant_id'], tiers[0]['num_plants']),
					APIUtil.postTier(token, response.id, 2, tiers[1]['plant_id'], tiers[1]['num_plants']),
					APIUtil.postTier(token, response.id, 3, tiers[2]['plant_id'], tiers[2]['num_plants']),
					APIUtil.postTier(token, response.id, 4, tiers[3]['plant_id'], tiers[3]['num_plants'])
				])
			})
			.then(response => {
				console.log('Tier registration response: ', response)
				return this.props.navigation.navigate('Auth')
			})
			.catch(error => {
				console.log('error', error)
			})
	}

	cancel() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Greenhouse' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.background}>
					<Text style={styles.heading}>Start the seedlings</Text>
					<Text style={styles.text}>Open the seed packets, and place two seeds in each hole of the rockwool, as illustrated. Once all necessary seeds have been placed in the rockwool, slide the seedling tray into the bottom layer of the greenhouse.</Text>
					<Image source={plugin} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={this.goToNext.bind(this)}>
						<Text style={styles.buttonText}>Complete Setup!</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}


				

export default StartSeedlingsScreen
