import { StyleSheet } from 'react-native'
import { BACKGROUND_COLOR, TEXT_COLOR, ACTION_COLOR, PLANT_COLOR } from '../util/constants'

const black = '#000000'
const darkener = 'rgba(0, 0, 0, 0.35)'

// Contrast note: darkest brown, with darker green and lightest green meets WCAG standards
export default StyleSheet.create({
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
	heading: {
		color: TEXT_COLOR,
		fontSize: 32,
		marginBottom: 20,
		textAlign: 'center'
	},
	text: {
		color: TEXT_COLOR,
		fontSize: 18,
		marginBottom: 20
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
	camera: { 
		flex: 1, 
		padding: 5 
	},
	cameraButtonContainer: { 
		width: '100%', 
		alignItems: 'center' 
	},
	activity: { 
		flex: 1,  
		width: '100%'
	},
	cameraButton: { 
		borderColor: TEXT_COLOR, 
		borderWidth: 2, 
		borderRadius: 50, 
		paddingLeft: 4, 
		paddingRight: 4
	},
	responseContainer: {
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center', 
		width: '100%'
	},
	responseText: {
		color: TEXT_COLOR, 
		fontSize: 30, 
		textShadowColor: black, 
		textShadowRadius: 1 
	}
})
