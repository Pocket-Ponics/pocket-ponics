import { StyleSheet } from 'react-native'
import { TEXT_COLOR } from '../../util/constants'

export default StyleSheet.create({
	background: {
		marginTop: 20
	},
	iconContainer: {
		flexDirection: 'row',
		padding: 10
	},
	text: {
		fontSize: 25,
		paddingLeft: 30,
		color: TEXT_COLOR,
		flex: 1,
	},
	title: {
		fontSize: 40,
		color: TEXT_COLOR,
		textAlign: 'center'
	},
	icon: {
		height: 50,
		width: 60,
		resizeMode: 'contain'
	},
	iconWide: {
		height: 50,
		width: 60,
		resizeMode: 'contain'
	},
})