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

	getReadableName(name) {
		switch(name) {
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
