import React from 'react';
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './setup-styles'

const plugin = require('../assets/plug.jpg')

class StartSeedlingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	goToNext() {
		console.log('Registering greenhouse!')
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Greenhouse' })],
		});
		this.props.navigation.dispatch(resetAction);
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
