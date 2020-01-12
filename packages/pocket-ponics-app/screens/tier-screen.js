import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';

const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

const { width: WIDTH } = Dimensions.get('window')

export default class Example extends React.Component {
	getImage(id) {
		switch(id) {
			case 1:
				return tomatoImage
			case 2:
				return greenbeanImage
			case 3:
				return spinachImage
			case 4:
				return turnipImage
		}
	}

	getReadableName(id) {
		switch(id) {
			case 1:
				return 'Tomatoes'
			case 2:
				return 'Green Beans'
			case 3:
				return 'Spinach'
			case 4:
				return 'Turnips'
		}
	}

	isValidpH(id, pH) {
		switch(id) {
			case 1:
				return pH >= 5.5 && pH <= 6.5
			case 2:
				return pH >= 6.0 && pH <= 6.5
			case 3:
				return pH >= 5.5 && pH <= 6.6
			case 4:
				return pH >= 6.0 && pH <= 6.5
		}
	}

	isValidEC(id, ec) {
		switch(id) {
			case 1:
				return ec >= 2.0 && ec <= 5.0
			case 2:
				return ec >= 2.0 && ec <= 4.0
			case 3:
				return ec >= 1.8 && ec <= 2.3
			case 4:
				return ec >= 1.8 && ec <= 2.4
		}
	}

	statusText(name, value, checker) {
		if(checker(name, value)) return "Good!"

		return "Adjusting"
	}

	render() {
		const plant = this.props.navigation.getParam('plant')
		const isReadyToHarvest = plant['cycle_time'].split(':')[2] === '00'
		console.log(plant)
		return (
			<View style={styles.backgroundContainer}>
				<Image source={this.getImage(plant['plant_id'])} style={styles.plantImage}/>
				<Text style={styles.title}>{this.getReadableName(plant['plant_id'])}</Text>
				<View style={styles.plantInfoContainer}>
					<View style={styles.valuesContainer}>
						<Text style={styles.value}>
							<Text style={styles.valueName}>pH:</Text> {plant['ph_level']}
						</Text>
						<Text style={styles.value}>
							<Text style={styles.valueName}>Electrical Conductivity:</Text> {plant['ec_level']}
						</Text>
						<Text style={styles.value}>
							<Text style={styles.valueName}>Estimated Harvest:</Text> {plant['cycle_time']}
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
