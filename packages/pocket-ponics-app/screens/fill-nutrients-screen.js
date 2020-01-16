import React from 'react'
import { Text,View, Image, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from './setup-styles'

const plugin = require('../assets/fill-nutrients.png')

class FillNutrientsScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	goToNext() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ 
				routeName: 'SoakWool',
			})],
		})
		this.props.navigation.dispatch(resetAction)
	}

	cancel() {
		return this.props.navigation.navigate('Auth')
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Fill the nutrient tank</Text>
					<Text style={styles.text}>Unscrew the cap on the front of the nutrient tank and pour in the nutrient solution that came with the greenhouse (About 1 liter of nutrients)</Text>
					<Image source={plugin} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={this.goToNext.bind(this)}>
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


				

export default FillNutrientsScreen
