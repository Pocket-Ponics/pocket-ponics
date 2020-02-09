import { Dimensions } from 'react-native'

import { StyleSheet } from 'react-native'
import { TEXT_COLOR, BACKGROUD_COLOR , ACTION_COLOR } from '../../util/constants'

const { width: WIDTH } = Dimensions.get('window')

export default StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		width: null,
		height: null,
		alignItems: 'center',
		backgroundColor: BACKGROUD_COLOR
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
		color: TEXT_COLOR
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
		width: WIDTH - 55,
		borderRadius: 22,
		fontSize: 16,
		color: TEXT_COLOR,
		fontWeight: 'bold',
		overflow: 'hidden',
		padding: 12,
		textAlign:'center',
		marginTop: 30
	}
})

