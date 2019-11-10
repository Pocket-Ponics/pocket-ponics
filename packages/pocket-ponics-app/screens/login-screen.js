import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	TextInput,
	Dimensions
} from 'react-native';

/*
import LoginScreen from './screens/login-screen'
import GreenhouseScreen from './screens/greenhouse-screen'
import TierScreen from './screens/tier-screen'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
	Login: {screen: LoginScreen},
	Greenhouse: {screen: GreenhouseScreen},
	Tier: { screen: TierScreen }
})

const App = createAppContainer(MainNavigator);

export default App;
*/


import bgImage from './assets/background.png'
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')
export default class Example extends Component {
	render() {
		return (
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>

			<View style={styles.inputContainer}>
				<Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.2)'}
					style={styles.inputIcon} />
				<TextInput
					style={styles.input}
					placeholder={'Username'}
					placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.2)'}
					style={styles.inputIcon} />
				<TextInput
					style={styles.input}
					placeholder={'Password'}
					placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
					secureTextEntry={true}
				/>
			</View>

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
	inputContainer: {
		marginTop: 30
	},

	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 45,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'rgba(0, 0, 0, 0.35)',
		color: 'rgba(255, 255, 255, 0.7)',
		marginHorizontal: 30
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37
	}
});
