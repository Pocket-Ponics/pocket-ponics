import React from 'react'
import { Text, View, Modal, TouchableOpacity } from 'react-native'

import styles from './app-styles'

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
import HarvestInstructionScreen from './screens/harvest-instruction-screen'
import TranslocationScreen from './screens/translocation-screen'
import MLCameraScreen from './screens/ml-camera-screen'
import ReplantScreen from './screens/replant-screen'
import SignUpScreen from './screens/signup-screen'
import ResetScreen from './screens/reset-password-screen'

import AuthUtil from './util/auth-util'

import { createAppContainer, createSwitchNavigator, NavigationActions, StackActions } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Notifications } from 'expo'

const AuthStack = createSwitchNavigator({ 
	AuthLoading: { screen: AuthLoadingScreen },
	Login: { screen: LoginScreen },
	SignUp: { screen: SignUpScreen },
	Reset: { screen: ResetScreen }
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
	HarvestInstruction: { screen: HarvestInstructionScreen },
	Translocation: { screen: TranslocationScreen },
	MLCamera: { screen: MLCameraScreen },
	Replant: { screen: ReplantScreen },
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

	navigateToItem(data) {
		if(data.type === 'Greenhouse') {
			this.navigator &&
				this.navigator.dispatch(StackActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ 
						routeName: data.type,
						params: {
							greenhouseId: data.payload.greenhouse_id,
							tierId: data.payload.tier,
						},
						key: data.payload.greenhouse_id + '/' + data.payload.tier
					})],
				}))
		} else {
			this.navigator &&
				this.navigator.dispatch(NavigationActions.navigate({ 
					routeName: data.type,
					params: {
						greenhouseId: data.payload.greenhouse_id,
						tierId: data.payload.tier,
					},
					key: data.payload.greenhouse_id + '/' + data.payload.tier
				}))
		}
			
	}

	goToNotification(notification) {
		this.clearNotification()
		return AuthUtil.getAuthToken(
			this.navigateToLogin.bind(this), 
			this.navigateToItem.bind(this, notification.data))
	}

	handleNotification(notification) {
		if(notification.origin === 'selected') {
			return this.goToNotification(notification)
		}

		this.setState({ notification, notificationText: notification.data.body })
		setTimeout(this.clearNotification.bind(this),5000)
	}

	clearNotification() {
		this.setState({ notification: null, notificationText: '' })
	}

	render() {
		return (
			<View style={styles.background}>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.notification !== null}>
					<TouchableOpacity 
						style={styles.notification}
						onPress={() => this.navigateToItem(this.state.notification.data)}>
						<Text style={styles.notificationText}>{this.state.notificationText}</Text>
					</TouchableOpacity>
				</Modal>
				<AppContainer
					ref={nav => {
						this.navigator = nav
					}}/>
			</View>
		)
	}
}

export default App
