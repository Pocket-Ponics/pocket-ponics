import React from 'react'
import { AsyncStorage, Text, View, SafeAreaView, Image, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from './setup-styles'

import Display from '../components/greenhouse/display'
import { 
	TOMATO_VALUES,
	GREENBEAN_VALUES,
	SPINACH_VALUES,
	TURNIP_VALUES
} from '../util/constants'

const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

const plants = [
	{ img: greenbeanImage, display: 'Greenbean', data: GREENBEAN_VALUES },
	{ img: spinachImage, display: 'Spinach', data: SPINACH_VALUES },
	{ img: turnipImage, display: 'Turnip', data: TURNIP_VALUES },
]

const topplants = [
	{ img: tomatoImage, display: 'Tomato', data: TOMATO_VALUES },
]

class TierSelectionScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	constructor(props) {
		super(props)

		this.state = {
			tiers: [{}, {}, {}, {}],
			name: '',
			modalVisible: false,
			currIndex: 0
		}

		this.onChangeName = this.onChangeName.bind(this)
	}

	goToNext() {
		AsyncStorage.setItem('tiers', JSON.stringify(this.state.tiers))
			.then(response => {
				const resetAction = StackActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ 
						routeName: 'FillWater'
					})],
				})
				this.props.navigation.dispatch(resetAction)
			})
	}

	cancel() {
		return this.props.navigation.navigate('Auth')
	}

	setTier(data) {
		return this.setState(prevState => ({
			modalVisible: false, 
			tiers: this.state.tiers.map((item, index) => {
				if(index === prevState.currIndex) return data

				return item
			})
		}))
	}

	onChangeName(name) {
		this.setState({ name })
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={styles.background}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={this.state.modalVisible}>
						<View
							style={{ justifyContent: 'flex-end', flex: 1 }}>
							<View style={{ height: 400, backgroundColor: '#FFF', borderRadius: 10}}>
							<Text style={{...styles.heading, color: "#000", alignSelf: 'center', marginTop: 20 }}>Plant Choices</Text>
							<FlatList
								data={this.state.currIndex === 0 ? topplants : plants}
								renderItem={({ item }) => (
									<TouchableOpacity style={styles.selectorButton} onPress={() => this.setTier(item.data)}>
										<Image source={item.img} style={styles.selectorImg}/>
										<Text>{item.display}</Text>
									</TouchableOpacity>
								)}
								numColumns={3}
								keyExtractor={(item, index) => index.toString()}/>
							</View>
						</View>
			        </Modal>
					<Text style={styles.heading}>Select plants</Text>
					<Text style={styles.text}>Name the greenhouse, and then tap each tier of the greenhouse to assign plants</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}>
						<Text style={{...styles.text, lineHeight: 45, paddingRight: 10, fontWeight: 'bold' }}>Name:</Text>
						<TextInput
							style={styles.input}
							placeholder={'Greenhouse Name'}
							placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
							value={this.state.name}
							onChangeText={this.onChangeName}
							autoCapitalize="words"/>
					</View>
					<View style={{ flex: 1 }}>
						<Display 
							tiers={this.state.tiers} 
							navigation={{navigate: (name, data) => this.setState({ modalVisible: true, currIndex: data.index })}}/>
					</View>
					<TouchableOpacity 
						style={{...styles.button, opacity: this.state.name === '' ? 0.3 : 1}} 
						onPress={this.goToNext.bind(this)} 
						disabled={this.state.name === ''}>
						<Text style={styles.buttonText}>Continue Setup</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}


				

export default TierSelectionScreen