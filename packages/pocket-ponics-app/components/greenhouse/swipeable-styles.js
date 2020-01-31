import { StyleSheet, Dimensions } from 'react-native'
import { BACKGROUND_COLOR, TEXT_COLOR } from '../../util/constants'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({  
	scroller: { 
		width, 
		backgroundColor: BACKGROUND_COLOR
	},
	greenhouseBackground: { 
		height: 600, 
		alignItems: 'center' 
	},
	greenhouseTitle: { 
		color: TEXT_COLOR, 
		fontSize: 40 
	}
})

export default styles