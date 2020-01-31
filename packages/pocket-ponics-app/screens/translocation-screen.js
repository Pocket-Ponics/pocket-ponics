import React from 'react'
import { 
	Text, 
	View, 
	Image,
	TouchableOpacity
} from 'react-native'

import styles from './setup-styles'

const transplant = require('../assets/transplant.png')

export default class Example extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Transplant Seedlings</Text>
					<Text style={styles.text}>Remove the seedling along with the rockwool from the tray. Wrap a moist paper towel around the rockwool. Place the wrapped rockwool into a net pot inside the approriate tier.</Text>
					<Image source={transplant} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Greenhouse')}>
						<Text style={styles.buttonText}>Done Transplanting</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}	
}

