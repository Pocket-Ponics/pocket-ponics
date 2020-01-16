import { StyleSheet } from 'react-native'
import { TEXT_COLOR, BACKGROUD_COLOR , ACTION_COLOR, PLANT_COLOR } from '../../util/constants'

export default StyleSheet.create({
	background: {
		backgroundColor: BACKGROUD_COLOR,
		color: TEXT_COLOR,
		padding: 20,
		flexDirection: 'column',
		flex: 1
	},
	heading: {
		color: TEXT_COLOR,
		fontSize: 32,
		marginBottom: 20,
	},
	image: {
		resizeMode: 'contain',
		width: '100%',
		flex: 1,
		marginBottom: 20
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
	cancelButton: {
		alignItems: 'center'
	},
	cancelButtonText: {
		color: PLANT_COLOR,
		fontSize: 22
	}
})