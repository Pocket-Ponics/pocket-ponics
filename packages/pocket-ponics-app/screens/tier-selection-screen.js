import React from 'react';
import { Text,View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import styles from './setup-styles'

import Display from '../components/greenhouse/display'

const plugin = require('../assets/plug.jpg')

class TierSelectionScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tiers: [null, null, null, null]
		}
	}

	static navigationOptions = {
		title: 'Setup',
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.background}>
					<Text style={styles.heading}>Select plants</Text>
					<Text style={styles.text}>Tap each tier of the greenhouse to assign plants</Text>
					<Display tiers={this.state.tiers} navigation={{navigate: () => console.log('dummy')}}/>
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


				

export default TierSelectionScreen