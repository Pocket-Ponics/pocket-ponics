import React from 'react'
import { 
	Text, 
	View, 
	Image,
	TouchableOpacity,
	AsyncStorage
} from 'react-native'

import APIUtil from '../util/api-util'

import styles from './setup-styles'

const transplant = require('../assets/transplant.png')

class TransplantScreen extends React.Component {
	async goToNext() {
		const name = this.props.navigation.getParam('name', '')
		const id  = this.props.navigation.getParam('id', 0)

		const token = await AsyncStorage.getItem('token')

		return APIUtil.clearSeedlings(token, id, name)
			.then(() => {
				global.greenhouses[id].seedlings = 0
				return this.props.navigation.navigate('Greenhouse')
			})
			.catch(error => {
				console.log('Transplant Error', error)

				// TODO - Remove when connected to AWS
				global.greenhouses[id].seedling_time = 0
				return this.props.navigation.navigate('Greenhouse')
			})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Transplant Seedlings</Text>
					<Text style={styles.text}>Remove the seedling along with the rockwool from the tray. Wrap a moist paper towel around the rockwool. Place the wrapped rockwool into a net pot inside the approriate tier.</Text>
					<Image source={transplant} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={this.goToNext.bind(this)}>
						<Text style={styles.buttonText}>Done Transplanting</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}	
}

export default TransplantScreen