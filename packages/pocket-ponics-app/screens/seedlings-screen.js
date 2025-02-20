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
const seedlingImage = require('../assets/seedling.png')

const { width: WIDTH } = Dimensions.get('window')

export default class SeedlingsScreen extends React.Component {
	render() {
		const seedlings = this.props.navigation.getParam('seedlings')
		return (
			<View style={styles.backgroundContainer}>
				<Image source={seedlingImage} style={styles.plantImage}/>
				<Text style={styles.title}>Seedlings</Text>
				<View style={styles.plantInfoContainer}>
					<View style={styles.valuesContainer}>
						<Text style={styles.value}>
							<Text style={styles.valueName}>Last Watered:</Text> {seedlings.lastWater}
						</Text>
						<Text style={styles.value}>
							<Text style={styles.valueName}>Next Water:</Text> {seedlings.nextWater}
						</Text>
						<Text style={styles.value}>
							<Text style={styles.valueName}>Planting date:</Text> {seedlings.plant}
						</Text>
					</View>
				</View>
				<TouchableOpacity>
					<Text style={styles.button}>Water Seedlings</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.button}>Plant Seedlings</Text>
				</TouchableOpacity>
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
