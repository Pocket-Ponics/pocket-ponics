import { StyleSheet } from 'react-native'
import { BACKGROUND_COLOR, } from '../util/constants'

const styles = StyleSheet.create({  
	container: {
		flex: 1
	},
	background: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR
	},
	button: {
		padding: 10,
	},
	buttonText: {
		fontWeight: 'bold',
		color: '#FFF',
		fontSize: 15,
	}
})

export default styles