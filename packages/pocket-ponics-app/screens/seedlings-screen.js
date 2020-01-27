import React from 'react'
import { 
	Text, 
	View, 
	Image,
	TouchableOpacity,
	AsyncStorage, 
} from 'react-native'

import { 
	ONE_DAY
} from '../util/constants'
import styles from './seedlings-screen-styles'

const seedlingImage = require('../assets/seedling.png')

export default class SeedlingsScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			seedlings: this.props.navigation.getParam('seedlings', null)
		}
	}

	async getGreenhouses() {
		const greenhouseString = await AsyncStorage.getItem('greenhouses')

		if(greenhouseString === null) {
			console.log('Error retrieving from storage')
			return
		}

		const greenhouses = JSON.parse(greenhouseString)
		const greenhouseId = this.props.navigation.getParam('greenhouseId', 0) 

		if(greenhouseId !== 0) {
			const seedlings = greenhouses.filter(() => true)[0].seedling_time

			this.setState({ seedlings })
		}
	}

	componentDidMount() {
		this.getGreenhouses()
	}

	generateDateString(date) {
		return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
	}

	render() {
		const seedlings = this.state.seedlings
		if(seedlings === null) {
			return (
				<View style={styles.backgroundContainer}>
					<Text style={styles.title}>No seedlings currently planted</Text>
					<TouchableOpacity>
						<Text style={styles.button}>Plant Seedlings</Text>
					</TouchableOpacity>
				</View>
			)
		}

		const transplantDate = new Date(seedlings)
		const transplantString = this.generateDateString(transplantDate)
		const today = new Date(Date.now())

		const timeTilTransplant = transplantDate.getTime() - Date.now()
		const daysTilTransplant = Math.ceil(timeTilTransplant / (1000 * 3600 * 24))
		const daysSincePlanted = 14 - daysTilTransplant

		const lastWater = new Date(today.getTime() - (ONE_DAY * (daysSincePlanted % 7)))
		let nextWater = new Date(today.getTime() + (ONE_DAY * (daysTilTransplant % 7)))
		
		return (
			<View style={styles.backgroundContainer}>
				<Image source={seedlingImage} style={styles.plantImage}/>
				<Text style={styles.title}>Seedlings</Text>
				<View style={styles.plantInfoContainer}>
					<View style={styles.valuesContainer}>
						<Text style={styles.value}>
							<Text style={styles.valueName}>Last Watered:</Text> {this.generateDateString(lastWater)}
						</Text>
						<Text style={styles.value}>
							<Text style={styles.valueName}>Next Water:</Text> {this.generateDateString(nextWater)}
						</Text>
						<Text style={styles.value}>
							<Text style={styles.valueName}>Transplant date:</Text> {transplantString}
						</Text>
					</View>
				</View>
				<TouchableOpacity>
					<Text style={styles.button}>Water Seedlings</Text>
				</TouchableOpacity>
				{daysTilTransplant === 0 ? (
					<TouchableOpacity>
						<Text style={styles.button}>Transplant Seedlings</Text>
					</TouchableOpacity>
				) : null }
			</View>
		)
	}
}
