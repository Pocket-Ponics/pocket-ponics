import React from 'react';
import { Text,View, SafeAreaView, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './setup-styles'

import Display from '../components/greenhouse/display'

const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

const plants = [
	{ img: greenbeanImage, display: 'Greenbean', data: {
		name: 'greenbeans',
		pH: 6.4,
		ec: 3.9
	}},
	{ img: spinachImage, display: 'Spinach', data: {
		name: 'spinach',
		pH: 6.1,
		ec: 1.9,
	}},
	{ img: turnipImage, display: 'Turnip', data: {
		name: 'turnip',
		pH: 6.2,
		ec: 2.0
	}},
]

const topplants = [
	{ img: tomatoImage, display: 'Tomato', data: {
		name: 'tomato',
		pH: 6.3,
		ec: 3.2,
		'plant_id': 1
	}},
]

class TierSelectionScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	constructor(props) {
		super(props)

		this.state = {
			tiers: [null, null, null, null],
			modalVisible: false,
			currIndex: 0
		}
	}

	goToNext() {
		const token = this.props.navigation.getParam('token', "")
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ 
				routeName: 'FillWater',
				params: {
					token,
					tiers: this.state.tiers
				}
			})],
		});
		this.props.navigation.dispatch(resetAction);
	}

	cancel() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Auth' })],
		});
		this.props.navigation.dispatch(resetAction);
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

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
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
					<Text style={styles.text}>Tap each tier of the greenhouse to assign plants</Text>
					<View style={{ flex: 1 }}>
						<Display tiers={this.state.tiers} navigation={{navigate: (name, data) => this.setState({ modalVisible: true, currIndex: data.index })}}/>
					</View>
					<TouchableOpacity style={styles.button} onPress={this.goToNext.bind(this)}>
						<Text style={styles.buttonText}>Continue Setup</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}


				

export default TierSelectionScreen