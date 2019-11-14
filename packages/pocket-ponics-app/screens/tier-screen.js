import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
} from 'react-native';

//import Expo from 'expo';
//import { StackNavigator } from 'react-navigation';

import bgImage from './toptier.png'

/* class tierscreen extends react.component {
	static navigationOptions = {
		title: 'tier-screen',
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Text
					onPress= { ()=> navigate('Greenhouse') }>Navigate to greenhouse 
				</Text>
			</View>
		);
	}
}

const NavigationApp = StackNavigator({
	Tier: { screen: tier-screen},
	Greenhouse: { screen: greenhouse-screen},
});
*/

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
