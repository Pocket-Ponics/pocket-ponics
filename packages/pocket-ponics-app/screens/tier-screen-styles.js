import { StyleSheet, Dimensions } from 'react-native'
import { BACKGROUND_COLOR, TEXT_COLOR, ACTION_COLOR } from '../util/constants'

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	background: {
		backgroundColor: BACKGROUND_COLOR,
		color: TEXT_COLOR,
		padding: 20,
		flexDirection: 'column',
		flex: 1
	},
	plantImage: {
		width: '100%',
		height: 175,
		marginTop: 30,
		marginBottom: 30,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		marginBottom: 20,
		color: TEXT_COLOR,
		textAlign: 'center'
	},
	plantInfoContainer: {
		flexDirection: 'row'
	},
	valuesContainer: {
		alignItems: 'flex-start'
	},
	value: {
		fontSize: 18,
		paddingTop: 10,
		color: TEXT_COLOR
	},
	valueName: {
		fontWeight: 'bold'
	},
	statusesContainer: {
		paddingLeft: 20,
	},
	button: {
		backgroundColor: ACTION_COLOR,
		borderRadius: 5,
		padding: 10,
		margin: 10,
		alignItems: 'center'
	},
	buttonText: {
		color: TEXT_COLOR,
		fontSize: 22
	},
})

export default styles