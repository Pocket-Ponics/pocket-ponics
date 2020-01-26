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

import styles from '../components/greenhouse/translocation';

const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

const { width: WIDTH } = Dimensions.get('window')


export default class Example extends React.Component {

	One(name) {
		switch(name) {
			case 'Tomatoes':
				return 'Remove the seedling along with the rockwool from the tray.'
			case 'Green Beans':
				return 'Remove the seedling along with the rockwool from the tray.'
			case 'Spinach':
				return 'Remove the seedling along with the rockwool from the tray.'
			case 'Turnip':
				return 'Remove the seedling along with the rockwool from the tray.'
		}
	}

	Two(name) {
		switch(name) {
			case 'Tomatoes':
				return 'Wrap a moist paper towel around the rockwool.'
			case 'Green Beans':
				return 'Wrap a moist paper towel around the rockwool.'
			case 'Spinach':
				return 'Wrap a moist paper towel around the rockwool.'
			case 'Turnip':
				return 'Wrap a moist paper towel around the rockwool.'
		}
	}

	Three(name) {
		switch(name) {
			case 'Tomatoes':
				return 'Place the wrapped rockwool into a net pot inside the tier.'
			case 'Green Beans':
				return 'place the wrapped rockwool into a net pot in the tier.'
			case 'Spinach':
				return 'place the wrapped rockwool into a net pot in the tier.'
			case 'Turnip':
				return 'place the wrapped rockwool into a net pot in the tier.'
		}
	}

	render() {
		const name = this.props.navigation.getParam('name')
		return (
			<View style={styles.backgroundContainer}>
				<Text style={styles.value}>
					<Text style={styles.valueName}>Instructions for translocation of:</Text> {name}
				</Text>

				<Text style={styles.value}></Text>

				<Text style={styles.value}>
					<Text style={styles.valueName}>Step 1:</Text> Remove the seedling along with the rockwool from the tray. 
				</Text>

				<Text style={styles.value}></Text>

				<Text style={styles.value}>
					<Text style={styles.valueName}>Step 2:</Text> {this.Two(name)}
				</Text>

				<Text style={styles.value}></Text>

				<Text style={styles.value}>
					<Text style={styles.valueName}>Step 3:</Text> {this.Three(name)}
				</Text>
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

