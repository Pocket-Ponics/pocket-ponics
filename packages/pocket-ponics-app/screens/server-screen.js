import React from 'react'
import { 
	Text, 
	View, 
	Image,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Alert,
	Platform,
	ActivityIndicator,
	FlatList,
	AsyncStorage
} from 'react-native'

import AuthUtil from '../util/auth-util'
import { TEXT_COLOR } from '../util/constants'

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './login-styles'

class ServerScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			pastServers: [
				{
					name: 'Default Server',
					host: 'Default host',
					port: 'Default port'
				}
			],
			currentServer: 0,
			customServerName: '',
			customServerHost: '',
			customServerPort: ''
		}
		this.login = this.login.bind(this)
		this.renderFooter = this.renderFooter.bind(this)
		this.onChangeServerName = this.onChangeServerName.bind(this)
		this.onChangeServerHost = this.onChangeServerHost.bind(this)
		this.onChangeServerPort = this.onChangeServerPort.bind(this)
		this.addServer = this.addServer.bind(this)
		this.saveServerInfo = this.saveServerInfo.bind(this)
	}

	changeServer(currentServer) {
		this.setState({ currentServer })
	}

	onChangeServerName(customServerName) {
		console.log('here')
		this.setState({ customServerName })
	}

	onChangeServerHost(customServerHost) {
		this.setState({ customServerHost })
	}

	onChangeServerPort(customServerPort) {
		this.setState({ customServerPort })
	}

	login() {
		if(this.state.username === '' || this.state.password === ''){
			Alert.alert('Invalid username or password')
			return
		}

		this.setState({ loading: true })

		return AuthUtil.login(this.state.username, this.state.password, () => this.props.navigation.navigate('Greenhouse'))
	}

	addServer() {
		this.setState(prevState => ({
			pastServers: [...prevState.pastServers, {
				name: prevState.customServerName,
				host: prevState.customServerHost,
				port: prevState.customServerPort
			}],
			currentServer: prevState.pastServers.length,
			customServerName: '',
			customServerHost: '',
			customServerPort: ''
		}))
	}

	async loadSettings() {
		const pastServers = JSON.parse(await AsyncStorage.getItem('serverInfo'))
		const currentServer = parseInt(await AsyncStorage.getItem('currentServer') || '-1', 10) + 1

		if(pastServers){
			this.setState(prevState => ({
				pastServers: [...prevState.pastServers, ...pastServers],
				currentServer
			}))
		}
	}

	componentDidMount() {
		this.loadSettings()
	}

	saveServerInfo() {
		AsyncStorage.setItem('serverInfo', JSON.stringify(this.state.pastServers.slice(1)))

		if(this.state.currentServer !== 0) {
			AsyncStorage.setItem('currentServer', (this.state.currentServer - 1) + '')
		} else {
			AsyncStorage.setItem('currentServer', '')
		}

		global.host = this.state.pastServers[this.state.currentServer].host
		global.port = this.state.pastServers[this.state.currentServer].port

		this.props.navigation.navigate('Login')
	}

	renderServer(serverData, index) {
		console.log('rendering here', this.state)
		return (
			<TouchableOpacity 
				style={this.state.currentServer === index ? styles.selectedServer : styles.server} 
				onPress={this.changeServer.bind(this, index)}>
				<Text style={styles.serverText}>{serverData.name}</Text>
				<Text style={styles.serverText}>{'Host: ' + serverData.host}</Text>
				<Text style={styles.serverText}>{'Port: ' + serverData.port}</Text>
			</TouchableOpacity>
		)
	}

	renderFooter() {
		return (
			<View>
				<Text style={styles.heading}>New Custom Server</Text>
				<TextInput
					style={styles.input}
					placeholder={'Custom Server Name'}
					placeholderTextColor={TEXT_COLOR}
					value={this.state.customServerName}
					onChangeText={this.onChangeServerName}/>
				<TextInput
					style={styles.input}
					placeholder={'Custom Server Host'}
					placeholderTextColor={TEXT_COLOR}
					value={this.state.customServerHost}
					onChangeText={this.onChangeServerHost}/>
				<TextInput
					style={styles.input}
					placeholder={'Custom Server Port'}
					placeholderTextColor={TEXT_COLOR}
					value={this.state.customServerPort}
					onChangeText={this.onChangeServerPort}/>
				<TouchableOpacity style={styles.cancelButton} onPress={this.addServer}>
					<Text style={styles.cancelButtonText}>Add Server</Text>
				</TouchableOpacity>
			</View>
		)
	}

	render() {
		console.log(this.state)
		return (
			<KeyboardAvoidingView style={styles.backgroundContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
				<View style={styles.loginContainer}>
					<Text style={styles.heading}>Select a Custom Server</Text>
					<Text style={styles.text}>For advanced users who have a personal Pocket Ponics server. Most users should just use the default server</Text>
					<FlatList
						data={this.state.pastServers}
						renderItem={({ item, index }) => this.renderServer(item, index)}
						keyExtractor={item => item.name}
						style={styles.serverList}
						ListFooterComponent={this.renderFooter}
						extraData={this.state}/>
					<TouchableOpacity style={styles.button} onPress={this.saveServerInfo}>
						<Text style={styles.buttonText}>Save Server Info</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default ServerScreen
