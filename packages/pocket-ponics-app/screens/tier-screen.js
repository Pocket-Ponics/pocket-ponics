import React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import { 
	Text, 
	View,
	Image,
	TouchableOpacity, 
	AsyncStorage, 
} from 'react-native'

import { 
	TOMATO_ID, 
	GREENBEAN_ID, 
	SPINACH_ID,
	TURNIP_ID,
	TOMATO_VALUES,
	GREENBEAN_VALUES,
	SPINACH_VALUES,
	TURNIP_VALUES,
	ONE_DAY
} from '../util/constants'

import styles from './tier-screen-styles'

const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')
var date = new Date().getDate();
const daysTilharvest = 0

const { width: WIDTH } = Dimensions.get('window')

	class TierScreen extends React.Component 
	{
		static navigationOptions = 
		{
			title: 'Setup',
		}
	}

export default class Example extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			plant: this.props.navigation.getParam('plant', {}),
		}
	}

	async getPlant() {
		const greenhouseString = await AsyncStorage.getItem('greenhouses')

		if(greenhouseString === null) {
			console.log('Error retrieving from storage')
			return
		}

		const greenhouses = JSON.parse(greenhouseString)
		const greenhouseId = this.props.navigation.getParam('greenhouseId', 0)
		const tierId = this.props.navigation.getParam('tierId', 0)

		if(greenhouseId !== 0 && tierId !== 0) {
			const plant = greenhouses.filter(() => true)[0].tiers[tierId-1]

			this.setState({ plant })
		}
	}

	componentDidMount() {
		this.getPlant()
	}

	getImage(id) {
		switch(id) {
		case TOMATO_ID:
			return tomatoImage
		case GREENBEAN_ID:
			return greenbeanImage
		case SPINACH_ID:
			return spinachImage
		case TURNIP_ID:
			return turnipImage
		}
	}


	// getReadableName(name) 
	// {
	// 	switch(name) 
	// 	{
	// 		case 'tomato':
	// 			return 'Tomatoes'
	// 		case 'greenbeans':
	// 			return 'Green Beans'
	// 		case 'spinach':
	// 			return 'Spinach'
	// 		case 'turnip':
	// 			return 'Turnips'
	// 	}
	// }

	getReadableName(id) {
		switch(id) {
		case TOMATO_ID:
			return 'Tomatoes'
		case GREENBEAN_ID:
			return 'Green Beans'
		case SPINACH_ID:
			return 'Spinach'
		case TURNIP_ID:
			return 'Turnips'
		}
	}

	isValidpH(id, pH) {
		switch(id) {
		case TOMATO_ID:
			return pH >= TOMATO_VALUES.minPH && pH <= TOMATO_VALUES.maxPH
		case GREENBEAN_ID:
			return pH >= GREENBEAN_VALUES.minPH && pH <= GREENBEAN_VALUES.maxPH
		case SPINACH_ID:
			return pH >= SPINACH_VALUES.minPH && pH <= SPINACH_VALUES.maxPH
		case TURNIP_ID:
			return pH >= TURNIP_VALUES.minPH && pH <= TURNIP_VALUES.maxPH
		}
	}

	isValidEC(id, ec) {
		switch(id) {
		case TOMATO_ID:
			return ec >= TOMATO_VALUES.minEC && ec <= TOMATO_VALUES.maxEC
		case GREENBEAN_ID:
			return ec >= GREENBEAN_VALUES.minEC && ec <= GREENBEAN_VALUES.maxEC
		case SPINACH_ID:
			return ec >= SPINACH_VALUES.minEC && ec <= SPINACH_VALUES.maxEC
		case TURNIP_ID:
			return ec >= TURNIP_VALUES.minEC && ec <= TURNIP_VALUES.maxEC
		}
	}

	statusText(name, value, checker) {
		if(checker(name, value)) return 'Good!'

		return 'Adjusting'
	}

	harvestinstruction() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'HarvestInstruction' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	render() {
		const plant = this.state.plant
		const harvestDate = new Date(plant.cycle_time)
		const harvestString = `${harvestDate.getMonth()+1}/${harvestDate.getDate()}/${harvestDate.getFullYear()}`
		const isReadyToHarvest = harvestDate - Date.now() < ONE_DAY
		
		return (
			<View style={styles.background}>
				<View style={styles.container}>
					<Image source={this.getImage(plant.plant_id)} style={styles.plantImage}/>
					<Text style={styles.title}>{this.getReadableName(plant.plant_id)}</Text>
					<View style={styles.plantInfoContainer}>
						<View style={styles.valuesContainer}>
							<Text style={styles.value}>
								<Text style={styles.valueName}>pH:</Text> {plant.ph_level}
							</Text>

							<Text style={styles.value}>
								<Text style={styles.valueName}>Electrical Conductivity:</Text> {plant.ec_level}
							</Text>
							
							<Text style={styles.value}>
								<Text style={styles.valueName}>Estimated Harvest:</Text> {harvestString}
							</Text>
						</View>
						<View style={styles.statusesContainer}>
							<Text style={styles.value}>
								{this.statusText(plant['plant_id'], plant['ph_level'], this.isValidpH)}
							</Text>
							<Text style={styles.value}>
								{this.statusText(plant['plant_id'], plant['ec_level'], this.isValidEC)}
							</Text>
							<Text style={styles.value}>
								{isReadyToHarvest ? 'Ready!' : ''}
							</Text>
						</View>
					</View>
					{
						isReadyToHarvest ? (
							<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HarvestInstruction', {name: this.getReadableName(plant.plant_id), })}>
								<Text style={styles.buttonText}>Harvest {this.getReadableName(plant.plant_id)}</Text>
							</TouchableOpacity>) : null
					}
				</View>
			</View>
		)
	}
}
