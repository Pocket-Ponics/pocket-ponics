import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GreenhouseScreen from './screens/greenhouse-screen'
import TierScreen from './screens/tier-screen'
import PurpleLightScreen from './screens/purple-light-screen'
import QRScannerScreen from './screens/qr-scanner-screen'
import WifiScreen from './screens/wifi-screen'
import TierSelectionScreen from './screens/tier-selection-screen'
import FillWaterScreen from './screens/fill-water-screen'
import FillNutrientsScreen from './screens/fill-nutrients-screen'
import SoakWoolScreen from './screens/soak-wool-screen'
import StartSeedlingsScreen from './screens/start-seedlings-screen'
import LoginScreen from './screens/login-screen'
import ProfileScreen from './screens/profile-screen'

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
	TierSelection: { screen: TierSelectionScreen },
	FillWater: { screen: FillWaterScreen },
	FillNutrients: { screen: FillNutrientsScreen },
	SoakWool: { screen: SoakWoolScreen },
	StartSeedlings: { screen: StartSeedlingsScreen },
	Profile: { screen: ProfileScreen },
},{
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#472600',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	},
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
