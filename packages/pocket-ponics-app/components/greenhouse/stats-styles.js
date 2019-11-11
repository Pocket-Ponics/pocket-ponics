import { StyleSheet, Text, View } from 'react-native';

// Contrast note: darkest brown, with darker green and lightest green meets WCAG standards
export default StyleSheet.create({
	background: {
		backgroundColor: '#73003A',
		padding: 50,
		borderRadius: 10,
		margin: 20
	},
	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 40,
		paddingLeft: 30,
		color: '#FFFFFF'
	},
	icon: {
		height: 100,
		width: 100,
		resizeMode: 'contain'
	},
	iconWide: {
		height: 60,
		width: 100,
		resizeMode: 'contain'
	},
})