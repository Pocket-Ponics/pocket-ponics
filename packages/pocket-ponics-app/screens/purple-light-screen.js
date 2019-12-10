import React from 'react';
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import styles from './setup-styles'

const plugin = require('../assets/plug.jpg')

class PurpleLightScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.background}>
					<Text style={styles.heading}>Wait for the purple light</Text>
					<Text style={styles.text}>Once your greenhouse is plugged in, give it a minute to start up. When the lights on the greenhouse pulse purple, click the button to continue the setup.</Text>
					<Image source={plugin} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('QRScanner')}>
						<Text style={styles.buttonText}>Continue Setup</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancelButton} onPress={()=> this.props.navigation.navigate('Greenhouse')}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}


				

export default PurpleLightScreen