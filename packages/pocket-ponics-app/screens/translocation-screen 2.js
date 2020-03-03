import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import styles from '../components/greenhouse/translocation';

const { width: WIDTH } = Dimensions.get('window')

export default class Example extends React.Component {

	Steps() {
		

				return 'Remove the seedling along with the rockwool from the tray. Wrap a moist paper towel around the rockwool.Place the wrapped rockwool into a net pot inside the tier.'
	}

	render() {
		return (
			<View style={styles.backgroundContainer}>
				<Text style={styles.value}>
					<Text style={styles.valueName}>instructions for transplanting</Text>
				</Text>

				<Text style={styles.value}></Text>

				<Text style={styles.value}>
					<Text style={styles.valueName}>Directions: </Text> {this.Steps()} 
				</Text>

			</View>
		)
	}	
}

