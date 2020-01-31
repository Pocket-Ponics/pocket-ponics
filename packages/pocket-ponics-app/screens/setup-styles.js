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
	image: {
		resizeMode: 'contain',
		width: '100%',
		flex: 1,
		marginBottom: 20
	},
	selectorButton: {
		flex: 1, 
		flexDirection: 'column', 
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectorImg: {
		resizeMode: 'contain',
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: BACKGROUND_COLOR,
	},
	scanner: {
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
	},
	wifiList: {
		marginBottom: 20,
	},
	wifi: {
		borderRadius: 5,
		padding: 10,
		margin: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: TEXT_COLOR,
	},
	wifiText: {
		color: TEXT_COLOR,
		fontSize: 22,
		flex: 1
	},
	row: {
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center' 
	},
	input: {
		flex: 1,
		height: 45,
		borderRadius: 45,
		fontSize: 18,
		paddingLeft: 20,
		backgroundColor: darkener,
		color: TEXT_COLOR,
	},
	inputLabel: {
		color: TEXT_COLOR,
		fontSize: 18,
		lineHeight: 45, 
		paddingRight: 10, 
		fontWeight: 'bold'
	},
	modal: { 
		justifyContent: 'flex-end', 
		flex: 1 
	},
	modalDisplay: { 
		height: 400, 
		backgroundColor: TEXT_COLOR, 
		borderRadius: 10
	},
	modalHeading: {
		fontSize: 32,
		marginBottom: 20,
		color: black, 
		alignSelf: 'center', 
		marginTop: 20
	},
	imageThumbnail: { 
		height: 50, 
		width: 50, 
		resizeMode: 'contain' 
	},
	rockwool: { 
		margin: 1, 
		borderRadius: 10,
		backgroundColor: BACKGROUND_COLOR,
		height: 60, 
		width: 60, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	listBackground: { 
		margin: 5, 
		alignItems: 'center', 
		backgroundColor: TEXT_COLOR
	}
})
