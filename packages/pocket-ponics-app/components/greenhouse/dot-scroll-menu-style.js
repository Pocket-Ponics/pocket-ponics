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
		fontSize: 20,
		paddingLeft: 5,
		paddingRight: 5,
		fontWeight: 'bold',
		color: "#999999"
	},
	current: {
		fontSize: 20,
		paddingLeft: 5,
		paddingRight: 5,
		fontWeight: 'bold',
		color: "#000000"
	}
})