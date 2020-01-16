import { StyleSheet } from 'react-native'
import { TEXT_COLOR } from '../../util/constants'

export default StyleSheet.create({
	background: {
		alignContent: 'center',
	},
	dotBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	dot: {
		fontSize: 25,
		paddingLeft: 5,
		paddingRight: 5,
		fontWeight: 'bold',
		color: TEXT_COLOR,
		opacity: .7
	},
	current: {
		fontSize: 25,
		paddingLeft: 5,
		paddingRight: 5,
		fontWeight: 'bold',
		color: TEXT_COLOR
	}
})