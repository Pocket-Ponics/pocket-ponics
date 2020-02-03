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
		const greenhouseString = await AsyncStorage.getItem('greenhouses')

		const greenhouses = JSON.parse(greenhouseString)
		const matchingIndex = greenhouses.findIndex(greenhouse => greenhouse.greenhouse_id === id)

		return APIUtil.clearSeedlings(token, id, name)
			.then(() => {
				greenhouses[matchingIndex].seedlings = 0
				return AsyncStorage.setItem('greenhouses', JSON.stringify(greenhouses))
			})
			.then(() => this.props.navigation.navigate('Greenhouse'))
			.catch(error => console.log('Transplant Error', error))
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