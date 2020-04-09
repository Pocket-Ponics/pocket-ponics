import { 
	StyleSheet,
	Dimensions
} from 'react-native'
import { BACKGROUND_COLOR, TEXT_COLOR, ACTION_COLOR, PLANT_COLOR } from '../util/constants'

const darkener = 'rgba(0, 0, 0, 0.35)'

const styles = StyleSheet.create({  
	backgroundContainer: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR
	},
	loginContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		marginTop: 40,
		width: '100%'
	},
	icon: {
		height: 200,
		width: 200,
		resizeMode: 'contain',
	},
	inputContainer: {
		marginTop: 5,
		alignItems: 'center',
		width: '100%'
	},
	input: {
		width: '100%',
		height: 45,
		borderRadius: 45,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: darkener,
		color: TEXT_COLOR,
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 15
	},
	button: {
		backgroundColor: ACTION_COLOR,
		borderRadius: 5,
		padding: 10,
		margin: 10,
		width: '100%',
		alignItems: 'center'
	},
	buttonText: {
		color: TEXT_COLOR,
		fontSize: 22
	},
	signUp: {
		color: PLANT_COLOR,
		fontSize: 18,
		marginBottom: 10,
	},
	heading: {
		color: TEXT_COLOR,
		fontSize: 32,
		marginBottom: 10,
		marginTop: 10,
		textAlign: 'center'
	},
	text: {
		color: TEXT_COLOR,
		fontSize: 18,
		marginBottom: 20
	},
	cancelButton: {
		alignItems: 'center'
	},
	cancelButtonText: {
		color: PLANT_COLOR,
		fontSize: 22
	},
	serverList: {
		margin: 0,
		width: '100%'
	},
	server: {
		borderRadius: 5,
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: TEXT_COLOR,
	},
	selectedServer: {
		borderRadius: 5,
		padding: 10,
		borderWidth: 3,
		borderColor: ACTION_COLOR,
	},
	serverText: {
		color: TEXT_COLOR,
		fontSize: 22,
	},
})

export default styles