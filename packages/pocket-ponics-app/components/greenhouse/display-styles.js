import { StyleSheet, Text, View } from 'react-native';

export default StyleSheet.create({
	background: {
		color: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
		flex: 1
	},
	topButton: {
		flex: 1.8,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		flex: 1, 
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tier: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		aspectRatio: 15/7,
	},
	backgroundImg: {
		resizeMode: 'contain'
	},
	toptier: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		aspectRatio: 150/126,
	},
	topImage: {
		height: '75%',
		width: '100%',
		marginTop: '6%',
		resizeMode: 'contain',
	},
	image: {
		flex: 1,
		aspectRatio: 1.5,
		resizeMode: 'contain',
		marginTop: '5%'
	},
	seedling: {
		flex: 1,
		aspectRatio: 1,
		resizeMode: 'contain',
		marginTop: '8%'
	},
})