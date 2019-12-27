import { StyleSheet, Text, View } from 'react-native';

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
		color: "#FFFFFF88"
	},
	current: {
		fontSize: 25,
		paddingLeft: 5,
		paddingRight: 5,
		fontWeight: 'bold',
		color: "#FFFFFF"
	}
})