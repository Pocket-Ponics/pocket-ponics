import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GreenhouseScreen from './screens/greenhouse-screen'
import TierScreen from './screens/tier-screen'
import PurpleLightScreen from './screens/purple-light-screen'
import QRScannerScreen from './screens/qr-scanner-screen'
import WifiScreen from './screens/wifi-screen'
import TierSelectionScreen from './screens/tier-selection-screen'
import LoginScreen from './screens/login-screen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({ 
	Login: { screen: LoginScreen } 
})

const AppStack = createStackNavigator({
	Greenhouse: { screen: GreenhouseScreen },
	Tier: { screen: TierScreen },
	PurpleLight: { screen: PurpleLightScreen },
	QRScanner: { screen: QRScannerScreen },
	Wifi: { screen: WifiScreen },
	TierSelection: { screen: TierSelectionScreen }
})

const App = createAppContainer(createSwitchNavigator(
	{
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'App',
	}
 ))

export default App;
