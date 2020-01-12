import React from 'react'
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from './setup-styles'

const plugin = require('../assets/fill-nutrients.png')

class FillNutrientsScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	goToNext() {
		const token = this.props.navigation.getParam('token', "")
		const tiers = this.props.navigation.getParam('tiers', [null, null, null, null])
		const name = this.props.navigation.getParam('name', '')
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ 
				routeName: 'SoakWool',
				params: { token, tiers, name }
			})],
		})
		this.props.navigation.dispatch(resetAction)
	}

	cancel() {
		return this.props.navigation.navigate('Auth')
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
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
			</SafeAreaView>
		)
	}
}


				

export default FillNutrientsScreen
