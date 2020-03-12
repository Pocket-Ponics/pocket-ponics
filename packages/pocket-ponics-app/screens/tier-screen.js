import React from 'react'
import { StackActions, NavigationActions } from 'react-navigation'

import { 
	Text, 
	View,
	Image,
	TouchableOpacity,
} from 'react-native'

import { 
	TOMATO_ID, 
	GREENBEAN_ID, 
	SPINACH_ID,
	TURNIP_ID,
	ONE_DAY
} from '../util/constants'

import styles from './tier-screen-styles'

const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

class TierScreen extends React.Component {
	constructor(props) {
		super(props)

		const greenhouseId = this.props.navigation.getParam('greenhouseId', 0)
		const currentGreenhouse = global.greenhouses[greenhouseId] || { tiers: [null,null,null,null] }
		const tierId = this.props.navigation.getParam('tierId', 0)
		const plant = currentGreenhouse.tiers[tierId-1] || {}

		this.state = {
			plant,
		}
	}

	componentDidMount() {const greenhouseId = this.props.navigation.getParam('greenhouseId', 0)
		const currentGreenhouse = global.greenhouses[greenhouseId] || { tiers: [null,null,null,null] }
		const tierId = this.props.navigation.getParam('tierId', 0)
		const plant = currentGreenhouse.tiers[tierId-1] || {}

		this.setState({ plant })
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

	getReadableName(id) {
		const plant = global.plants[id] || {}
		return plant.name
	}

	isValidpH(id, pH) {
		const plant = global.plants[id] || {}
		return pH >= plant.ph_level_low
			&& pH <= plant.ph_level_high
	}

	isValidEC(id, ec) {
		const plant = global.plants[id] || {}
		return ec >= plant.ec_level_low
			&& ec <= plant.ec_level_high
	}

	statusText(name, value, checker) {
		if(checker(name, value)) return 'Good!'

		return 'Adjusting'
	}

	harvestinstruction() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'HarvestInstruction' })],
		})
		this.props.navigation.dispatch(resetAction)
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
							<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MLCamera', { ...this.props.navigation.state.params, id: plant.plant_id })}>
								<Text style={styles.buttonText}>Harvest {this.getReadableName(plant.plant_id)}</Text>
							</TouchableOpacity>) : null
					}
				</View>
			</View>
		)
	}
}

export default TierScreen
