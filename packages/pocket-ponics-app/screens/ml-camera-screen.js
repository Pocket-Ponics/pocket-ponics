import React, { useState, useEffect } from 'react'
import { 
	Text, 
	View,
	TouchableOpacity,
	ActivityIndicator,
	AsyncStorage
} from 'react-native'
import { Camera } from 'expo-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImageManipulator from 'expo-image-manipulator'
import * as Permissions from 'expo-permissions'

import APIUtil from '../util/api-util'

import styles from './setup-styles'

const displayImage = (success, accuracy) => {
	if(success === null) return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}/>
	if(!success || accuracy < .80) {
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
				<Icon name='times-circle' size={70} color="#FFF"/>
				<Text style={{color: '#FFF', fontSize: 30, textShadowColor: '#000', textShadowRadius: 1 }}>Do not harvest</Text>
			</View>
		)
	}
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
			<Icon name='check-circle' size={70} color="#FFF"/>
			<Text>Ready to harvest!</Text>
		</View>
	)
}

const MLCameraScreen = props => {
	const [hasPermission, setHasPermission] = useState(null)
	const [processing, setProcessing] = useState(false)
	const [success, setSuccess] = useState(null)
	const [accuracy, setAccuracy] = useState(0)

	useEffect(() => {
		(async () => {
			return Permissions.askAsync(Permissions.CAMERA)
				.then(({ status }) => setHasPermission(status === 'granted'))
				.catch(error => console.log('Camera permission error', error))
		})()
	}, [])

	if (hasPermission === null) {
		return <View />
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

	const id = props.navigation.getParam('id')

	const takePicture = async () => {
		setProcessing(true)
		const token = await AsyncStorage.getItem('token')

		this.camera.takePictureAsync({ quality: 0.1 })
			.then(photo => {
				return ImageManipulator.manipulateAsync(
					photo.uri,
					[{ resize: { width: 500, height: 500 } }],
					{ compress: 0, format: 'jpeg', base64: true }
				)
			})
			.then(photo => {
				console.log(photo.base64)
				return APIUtil.classifyPhoto(token, photo.base64)
			})
			.then(response => {
				console.log(response)
				setProcessing(false)
				setSuccess(true)
				setSuccess(true)
			})
			.catch(error => {
				console.log(error)
				setProcessing(false)
				setSuccess(false)
				setAccuracy(0)
			})
	}

	return (
		<View style={styles.container}>
			<View style={styles.background}>
				<Text style={styles.heading}>Harvest Check</Text>
				<Text style={styles.text}>Point the camera at the plant, and then press the button to take a picture</Text>
				<Camera style={{ flex: 1, padding: 5 }} ref={(ref) => { this.camera = ref }}>
					{processing ? <ActivityIndicator size="large" color="#FFF" style={{ flex: 1,  width: '100%'}}/> : displayImage(success, accuracy)}
					<View style={{ width: '100%', alignItems: 'center' }}>
						<TouchableOpacity style={{ borderColor: 'white', borderWidth: 2, borderRadius: 50, paddingLeft: 4, paddingRight: 4}} onPress={() => takePicture()} disabled={processing}>
							<Icon name={'circle'} size={50} color='#FFF' />
						</TouchableOpacity>
					</View>
				</Camera>
				<TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('HarvestInstruction', { id })}>
					<Text style={styles.buttonText}>Start Harvesting</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default MLCameraScreen
