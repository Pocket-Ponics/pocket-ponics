import { StyleSheet, Text, View } from 'react-native';


// Contrast note: darkest brown, with darker green and lightest green meets WCAG standards
export default StyleSheet.create({
	background: {
		backgroundColor: '#1A0E00',
		color: '#FFFFFF',
		padding: 50,
		borderRadius: 10,
		margin: 20
	},
	tier: {
		width: '100%',
		height: 60,
		resizeMode: 'contain'
	},
	toptier: {
		width: '100%',
		height: 105,
		resizeMode: 'contain'
	},
})