import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

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
	getImage(name) {
		switch(name) {
			case 'tomato':
				return tomatoImage
			case 'greenbeans':
				return greenbeanImage
			case 'spinach':
				return spinachImage
			case 'turnip':
				return turnipImage
		}
	}

	getReadableName(name) 
	{
		switch(name) 
		{
			case 'tomato':
				return 'Tomatoes'
			case 'greenbeans':
				return 'Green Beans'
			case 'spinach':
				return 'Spinach'
			case 'turnip':
				return 'Turnips'
		}
	}

	isValidpH(name, pH) {
		switch(name) {
			case 'tomato':
				return pH >= 5.5 && pH <= 6.5
			case 'greenbeans':
				return pH >= 6.0 && pH <= 6.5
			case 'spinach':
				return pH >= 5.5 && pH <= 6.6
			case 'turnip':
				return pH >= 6.0 && pH <= 6.5
		}
	}

	isValidEC(name, ec) {
		switch(name) {
			case 'tomato':
				return ec >= 2.0 && ec <= 5.0
			case 'greenbeans':
				return ec >= 2.0 && ec <= 4.0
			case 'spinach':
				return ec >= 1.8 && ec <= 2.3
			case 'turnip':
				return ec >= 1.8 && ec <= 2.4
		}
	}

	statusText(name, value, checker) {
		if(checker(name, value)) return "Good!"

		return "Adjusting"
	}

	harvestinstruction() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'HarvestInstruction' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	render() {
		const plant = this.props.navigation.getParam('plant')
		return (
			<View style={styles.backgroundContainer}>
				<Image source={this.getImage(plant.name)} style={styles.plantImage}/>
				<Text style={styles.title}>{this.getReadableName(plant.name)}</Text>
				<View style={styles.plantInfoContainer}>
					<View style={styles.valuesContainer}>
						<Text style={styles.value}>
							<Text style={styles.valueName}>pH:</Text> {plant.pH}
						</Text>

						<Text style={styles.value}>
							<Text style={styles.valueName}>Electrical Conductivity:</Text> {plant.ec}
						</Text>
						
						<Text style={styles.value}>
							<Text style={styles.valueName}>Estimated Harvest:</Text> 11/10
						</Text>
					</View>
					<View style={styles.statusesContainer}>
						<Text style={styles.value}>
							{this.statusText(plant.name, plant.pH, this.isValidpH)}
						</Text>
						<Text style={styles.value}>
							{this.statusText(plant.name, plant.ec, this.isValidEC)}
						</Text>
						<Text style={styles.value}>
							Ready!
						</Text>
					</View>
				</View>
				{daysTilharvest === 0 ? (
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HarvestInstruction', {name: this.getReadableName(plant.name), })}>
						<Text style={styles.buttonText}>Harvest {this.getReadableName(plant.name)}</Text>
					</TouchableOpacity>
				) : null }
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
