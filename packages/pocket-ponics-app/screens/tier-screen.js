import React from 'react'
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native'

import { 
	TOMATO_ID, 
	GREENBEEN_ID, 
	SPINACH_ID,
	TURNIP_ID,
	TOMATO_VALUES,
	GREENBEAN_VALUES,
	SPINACH_VALUES,
	TURNIP_VALUES,
	ONE_DAY
} from '../util/constants'

const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

const { width: WIDTH } = Dimensions.get('window')

export default class Example extends React.Component {
	getImage(id) {
		switch(id) {
			case TOMATO_ID:
				return tomatoImage
			case GREENBEEN_ID:
				return greenbeanImage
			case SPINACH_ID:
				return spinachImage
			case TURNIP_ID:
				return turnipImage
		}
	}

	getReadableName(id) {
		switch(id) {
			case TOMATO_ID:
				return 'Tomatoes'
			case GREENBEEN_ID:
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
			case GREENBEEN_ID:
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
			case GREENBEEN_ID:
				return ec >= GREENBEAN_VALUES.minEC && ec <= GREENBEAN_VALUES.maxEC
			case SPINACH_ID:
				return ec >= SPINACH_VALUES.minEC && ec <= SPINACH_VALUES.maxEC
			case TURNIP_ID:
				return ec >= TURNIP_VALUES.minEC && ec <= TURNIP_VALUES.maxEC
		}
	}

	statusText(name, value, checker) {
		if(checker(name, value)) return "Good!"

		return "Adjusting"
	}

	render() {
		const plant = this.props.navigation.getParam('plant')
		const harvestDate = new Date(plant.cycle_time)
		const harvestString = `${harvestDate.getMonth()+1}/${harvestDate.getDate()}/${harvestDate.getFullYear()}`
		const isReadyToHarvest = harvestDate - Date.now() < ONE_DAY
		
		return (
			<View style={styles.backgroundContainer}>
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
						<TouchableOpacity>
							<Text style={styles.button}>Harvest {this.getReadableName(plant.name)}</Text>
						</TouchableOpacity>) : null
				}
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		width: null,
		height: null,
		alignItems: 'center',
		backgroundColor: '#472600'
	},
	plantImage: {
		width: 250,
		height: 175,
		marginTop: 30,
		marginBottom: 30,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#FFFFFF'
	},
	plantInfoContainer: {
		flexDirection: 'row'
	},
	valuesContainer: {
		alignItems: 'flex-start',
	},
	value: {
		fontSize: 18,
		paddingTop: 10,
		color: '#FFFFFF'
	},
	valueName: {
		fontWeight: 'bold'
	},
	statusesContainer: {
		paddingLeft: 20,
	},
	button: {
		backgroundColor: '#638E4E',
		width: WIDTH - 55,
		borderRadius: 22,
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold',
		overflow: 'hidden',
		padding: 12,
		textAlign:'center',
		marginTop: 30
	}
})
