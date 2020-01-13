import { StyleSheet, Text, View, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')

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
	selectorButton: {
		flex: 1, 
		flexDirection: 'column', 
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectorImg: {
		resizeMode: 'contain',
		width: '80%',
		height: '80%',
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#1A0E00',
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
	input: {
		flex: 1,
		height: 45,
		borderRadius: 45,
		fontSize: 18,
		paddingLeft: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.35)',
		color: '#FFFFFF',
	},
	imageThumbnail: { 
		height: 50, 
		width: 50, 
		resizeMode: 'contain' 
	},
	rockwool: { 
		margin: 1, 
		borderRadius: 10,
		backgroundColor: '#472600',
		height: 60, 
		width: 60, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	listBackground: { 
		flex: 1,
		margin: 5, 
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: '#FFFFFF'
	}
})
