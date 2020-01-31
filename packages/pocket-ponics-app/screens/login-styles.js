import { 
	StyleSheet,
	Dimensions
} from 'react-native'
import { BACKGROUND_COLOR, TEXT_COLOR, ACTION_COLOR, PLANT_COLOR } from '../util/constants'

const darkener = 'rgba(0, 0, 0, 0.35)'

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({  
	backgroundContainer: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR
	},
	loginContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 100
	},
	icon: {
		height: 200,
		width: 200,
		resizeMode: 'contain',
	},
	inputContainer: {
		marginTop: 5,
		alignItems: 'center'
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 45,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: darkener,
		color: TEXT_COLOR,
		marginHorizontal: 30
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 45
	},
	button: {
		backgroundColor: ACTION_COLOR,
		width: WIDTH - 55,
		borderRadius: 22,
		fontSize: 22,
		color: TEXT_COLOR,
		textAlign:'center',
		overflow: 'hidden',
		padding: 10,
		margin: 10,
	},
	signUp: {
		color: PLANT_COLOR,
		fontSize: 18
	}
})

export default styles