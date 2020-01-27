import React from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from './new-greenhouse-styles'

const plugin = require('../../assets/plugin.png')

class NewGreenhouse extends React.Component {
	goToNext() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [ NavigationActions.navigate({ 
				routeName: 'PurpleLight',
				params: { token: this.props.token }
			})],
		})
		this.props.navigation.dispatch(resetAction)
	}

	render() {
		const { width } = Dimensions.get('window')
		return (
			<View style={{...styles.background, width }}>
				<Text style={styles.heading}>Begin greenhouse setup</Text>
				<Text style={styles.text}>Let&apos;s get your new Pocket &apos;Ponics greenhouse registered and ready to use. To start, plug your greenhouse into the wall.</Text>
				<Image source={plugin} style={styles.image}/>
				<TouchableOpacity style={styles.button} onPress={this.goToNext.bind(this)}>
					<Text style={styles.buttonText}>Continue Setup</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.cancelButton} disabled>
					<Text style={styles.cancelButtonText}>Cancel Setup</Text>
				</TouchableOpacity>
			</View>
		)
	}	
}

export default NewGreenhouse