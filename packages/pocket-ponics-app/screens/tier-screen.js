import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
} from 'react-native';


const bgImage = require('../assets/top-tier.png')

export default class Example extends React.Component {
	render() {
		return (
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
				<Text>{this.props.navigation.getParam('plant')}</Text>
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
