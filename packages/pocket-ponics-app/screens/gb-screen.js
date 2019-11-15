import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
} from 'react-native';


import bgImage from './gb.png'


export default class Example extends Component {
	render() {
		return (
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
			
			</ImageBackground>

		);
	}
}

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: 'center',
		alignItems: 'center',
	},

});
