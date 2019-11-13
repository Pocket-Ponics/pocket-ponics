import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	TextInput,
	Dimensions,
	TouchableOpacity
} from 'react-native';



import bgImage from './background.png'
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')
export default class Example extends Component {
//	constructor(){
//		this.state = {
//			showPass: true,
//			press: false
//		}
//	}

//	showPass = () => {
//		if (this.state.press == false) {
//			this.setState({ showPass: false, press: true })
//		} else {
//			this.setState({ showPass: true, press: false })
//		}
//	}

	render() {
		return (
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>

				<View style={styles.inputContainer}>
					<Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.2)'}
						style={styles.inputIcon} />
					<TextInput
						style={styles.input}
						placeholder={'Username'}
						placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
					/>
				</View>

				<View style={styles.inputContainer}>
					<Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.2)'}
						style={styles.inputIcon} />
					<TextInput
						style={styles.input}
						placeholder={'Password'}
						placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
						secureTextEntry={true}
					/>
				</View>

				<TouchableOpacity style={styles.btnLogin}>
					<Text sytle={styles.text} >Login</Text>
				</TouchableOpacity>

			</ImageBackground>

		);
	}
}

const styles = StyleSheet.create({  
	backgroundContainer: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		marginTop: 30
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 45,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'rgba(0, 0, 0, 0.35)',
		color: 'rgba(255, 255, 255, 0.7)',
		marginHorizontal: 30
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37
	},
	btnLogin: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		backgroundColor: '#432577',
		justifyContent: 'center',
		marginTop: 20
	},
	text: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: 16,
		textAlign: 'center'
	}
});
