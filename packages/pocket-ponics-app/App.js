import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GreenhouseScreen from './screens/greenhouse-screen'
import TierScreen from './screens/tier-screen'
import LoginScreen from './screens/login-screen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({ 
	Login: { screen: LoginScreen } 
})

const AppStack = createStackNavigator({
	Greenhouse: { screen: GreenhouseScreen },
	Tier: { screen: TierScreen }
})

const App = createAppContainer(createSwitchNavigator(
	{
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'Auth',
	}
 ))

export default App;
