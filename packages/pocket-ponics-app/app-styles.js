import { StyleSheet } from 'react-native'
import { BACKGROUND_COLOR, PLANT_COLOR } from './util/constants'

export default StyleSheet.create({
	background: {
		flex: 1, 
		backgroundColor: BACKGROUND_COLOR 
	},
	notification: { 
		justifyContent: 'center', 
		alignItems: 'center',
		margin: 10,
		marginTop: 30, 
		height: 50, 
		backgroundColor: PLANT_COLOR,
		borderRadius: 10 
	},
	notificationText: { 
		fontWeight: 'bold', 
		fontSize: 20 
	}
})