import React from 'react'
import { 
	Text, 
	View, 
	Image,
	TouchableOpacity,
} from 'react-native'

import { 
	ONE_DAY
} from '../util/constants'
import styles from './seedlings-screen-styles'

const seedlingImage = require('../assets/seedling.png')

export default class SeedlingsScreen extends React.Component {
	constructor(props) {
		super(props)

		const greenhouses = global.greenhouses
		const greenhouseId = this.props.navigation.getParam('greenhouseId', 0) 

		this.state = {
			seedlings: greenhouses[greenhouseId].seedling_time
		}
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

		const name = this.props.navigation.getParam('name', '')
		const id  = this.props.navigation.getParam('greenhouseId', 0)

		const transplantDate = new Date(seedlings)
		console.log('date',transplantDate, seedlings)
		const transplantString = this.generateDateString(transplantDate)
		const today = new Date(Date.now())

		const timeTilTransplant = transplantDate.getTime() - Date.now()
		const daysTilTransplant = Math.ceil(timeTilTransplant / (1000 * 3600 * 24))
		const daysSincePlanted = 14 - daysTilTransplant

		const lastWater = new Date(today.getTime() - (ONE_DAY * (daysSincePlanted % 7)))
		let nextWater = new Date(today.getTime() + (ONE_DAY * (daysTilTransplant % 7)))
		
		return (
			<View style={styles.background}>
				<View style={styles.container}>
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
					<View styles={styles.buttonBox}>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>Water Seedlings</Text>
						</TouchableOpacity>
						{daysTilTransplant <= 0 ? (
							<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Translocation', { name, id })}>
								<Text style={styles.buttonText}>Transplant Seedlings</Text>
							</TouchableOpacity>
						) : null }
					</View>
				</View>
			</View>
		)
	}
}
