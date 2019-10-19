import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GreenhouseScreen from './screens/greenhouse-screen'
import TierScreen from './screens/tier-screen'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Greenhouse: {screen: GreenhouseScreen},
  Tier: { screen: TierScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
