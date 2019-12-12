import { StyleSheet, Text, View } from 'react-native';


// Contrast note: darkest brown, with darker green and lightest green meets WCAG standards
export default StyleSheet.create({
	background: {
		backgroundColor: '#1A0E00',
		color: '#FFFFFF',
		borderRadius: 10,
		margin: 20,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	topButton: {
		flex: 1.8,
		width: '100%'
	},
	button: {
		flex: 1, 
		width: '100%'
	},
	tier: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	backgroundImg: {
		resizeMode: 'contain'
	},
	toptier: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	topImage: {
		height: '75%',
		width: '100%',
		marginTop: '4%',
		resizeMode: 'contain',
	},
	image: {
		height: '50%',
		width: '20%',
		resizeMode: 'contain',
		marginTop: '2.5%'
	},
	seedling: {
		width: '12%',
		height: '50%',
		marginTop: '2.5%',
		resizeMode: 'contain',
	},
})