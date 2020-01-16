import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Modal } from 'react-native'

import GreenhouseScreen from './screens/greenhouse-screen'
import TierScreen from './screens/tier-screen'
import SeedlingsScreen from './screens/seedlings-screen'
import PurpleLightScreen from './screens/purple-light-screen'
import NetworkConnectionScreen from './screens/network-connection-screen'
import WifiScreen from './screens/wifi-screen'
import TierSelectionScreen from './screens/tier-selection-screen'
import FillWaterScreen from './screens/fill-water-screen'
import FillNutrientsScreen from './screens/fill-nutrients-screen'
import SoakWoolScreen from './screens/soak-wool-screen'
import StartSeedlingsScreen from './screens/start-seedlings-screen'
import ProfileScreen from './screens/profile-screen'
import ChangePasswordScreen from './screens/change-password-screen'
import AuthLoadingScreen from './screens/auth-loading-screen'
import LoginScreen from './screens/login-screen'
import SignUpScreen from './screens/signup-screen'

import AuthUtil from './util/auth-util'

import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Notifications } from 'expo'

const AuthStack = createSwitchNavigator({ 
	AuthLoading: { screen: AuthLoadingScreen },
	Login: { screen: LoginScreen },
	SignUp: { screen: SignUpScreen } 
})

const AppStack = createStackNavigator({
	Greenhouse: { screen: GreenhouseScreen },
	Tier: { screen: TierScreen },
	Seedlings: { screen: SeedlingsScreen },
	PurpleLight: { screen: PurpleLightScreen },
	NetworkConnection: { screen: NetworkConnectionScreen },
	Wifi: { screen: WifiScreen },
	TierSelection: { screen: TierSelectionScreen },
	FillWater: { screen: FillWaterScreen },
	FillNutrients: { screen: FillNutrientsScreen },
	SoakWool: { screen: SoakWoolScreen },
	StartSeedlings: { screen: StartSeedlingsScreen },
	Profile: { screen: ProfileScreen },
	ChangePassword: { screen: ChangePasswordScreen }
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

const AppContainer = createAppContainer(createSwitchNavigator(
	{
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'Auth',
	}
))

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			notification: null,
			notificationText: ''
		}
	}

	componentDidMount() {
		this.notificationSubscription = Notifications.addListener(this.handleNotification.bind(this))
	}

	navigateToLogin() {
		this.navigator &&
			this.navigator.dispatch(
				NavigationActions.navigate({ routeName: 'Login' })
			)
	}

	getRouteForType(type) {
		return type.replace(/^\w/, c => c.toUpperCase())
	}

	navigateToItem(data) {
		this.navigator &&
			this.navigator.dispatch(
				NavigationActions.navigate({ 
					routeName: this.getRouteForType(data.type),
					params: {
						greenhouseId: data.greenhouse_id,
						tierId: data.tier,
					}
				})
			)
	}

	handleNotification(notification) {
		console.log(notification)
		if(notification.origin === 'selected') {
			return AuthUtil.getAuthToken(
				this.navigateToLogin.bind(this), 
				this.navigateToItem.bind(this, notification.data))
		}

		console.log('here')

		this.setState({ notification, notificationText: notification.data.body })
		setTimeout(this.clearNotification.bind(this),5000);
	}

	clearNotification() {
		this.setState({ notification: null, notificationText: '' })
	}

	render() {
		console.log(this.state.notification)
		return (
			<View style={{flex: 1, backgroundColor: '#472600' }}>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.notification !== null}>
					<View style={{ justifyContent: 'flex-end', marginTop: 30, height: 50, backgroundColor: '#FFFFFF'}}>
						<Text>{this.state.notificationText}</Text>
					</View>
		        </Modal>
				<AppContainer
					ref={nav => {
						this.navigator = nav;
					}}/>
			</View>
		)
	}
}

export default App;
