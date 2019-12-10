import { StyleSheet, Text, View } from 'react-native';

// Contrast note: darkest brown, with darker green and lightest green meets WCAG standards
export default StyleSheet.create({
	background: {
		backgroundColor: '#472600',
		color: '#FFFFFF',
		padding: 20,
		flexDirection: 'column',
		flex: 1
	},
	heading: {
		color: '#FFFFFF',
		fontSize: 32,
		marginBottom: 20,
	},
	image: {
		resizeMode: 'contain',
		width: '100%',
		flex: 1,
		marginBottom: 20
	},
	scanner: {
		flex: 1,
		marginBottom: 20
	},
	text: {
		color: '#FFFFFF',
		fontSize: 18,
		marginBottom: 20
	},
	button: {
		backgroundColor: '#456E31',
		borderRadius: 5,
		padding: 10,
		margin: 10,
		alignItems: 'center'
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 22
	},
	cancelButton: {
		alignItems: 'center'
	},
	cancelButtonText: {
		color: '#84AB71',
		fontSize: 22
	},
	wifiList: {
		marginBottom: 20,
	},
	wifi: {
		borderRadius: 5,
		padding: 10,
		margin: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#FFFFFF44'
	},
	wifiText: {
		color: '#FFFFFF',
		fontSize: 22,
		flex: 1
	},
})