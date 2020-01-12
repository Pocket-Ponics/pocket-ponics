import React from 'react';
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './setup-styles'

const greenhouseLights = require('../assets/greenhouse-lights.png')

class PurpleLightScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	goToNext() {
		const token = this.props.navigation.getParam('token', "")
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ 
				routeName: 'QRScanner',
				params: { token }
			})],
		});
		this.props.navigation.dispatch(resetAction);
	}

	cancel() {
		return this.props.navigation.navigate('Auth')
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.background}>
					<Text style={styles.heading}>Wait for the purple light</Text>
					<Text style={styles.text}>Once your greenhouse is plugged in, give it a minute to start up. When the lights on the greenhouse pulse purple, click the button to continue the setup.</Text>
					<Image source={greenhouseLights} style={styles.image}/>
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


				

export default PurpleLightScreen