import { StyleSheet, Text, View } from 'react-native';


// Contrast note: darkest brown, with darker green and lightest green meets WCAG standards
export default StyleSheet.create({
	background: {
		backgroundColor: '#1A0E00',
		color: '#FFFFFF',
		padding: 50,
		borderRadius: 10,
		margin: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tier: {
		width: 200,
		height: 90,
		resizeMode: 'contain',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	toptier: {
		width: 200,
		height: 160,
		resizeMode: 'contain',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	topImage: {
		width: 200,
		height: 120,
		marginTop: 15,
		resizeMode: 'contain',
		paddingLeft: 40
	},
	image: {
		width: 50,
		height: 50,
		marginTop: 5,
		resizeMode: 'contain',
		paddingLeft: 40,
	},
	seedling: {
		width: 1,
		height: 30,
		marginTop: 24,
		resizeMode: 'contain',
		paddingLeft: 40
	},
})