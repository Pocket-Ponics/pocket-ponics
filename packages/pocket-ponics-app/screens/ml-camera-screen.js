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

import styles from './ml-camera-styles'

const displayImage = (success, accuracy) => {
	if(success === null) return <View style={styles.responseContainer}/>
	if(!success || accuracy < .80) {
		return (
			<View style={styles.responseContainer}>
				<Icon name='times-circle' size={70} color="#FFF"/>
				<Text style={styles.responseText}>Do not harvest</Text>
			</View>
		)
	}
	return (
		<View style={styles.responseContainer}>
			<Icon name='check-circle' size={70} color="#FFF"/>
			<Text style={styles.responseText}>Ready to harvest!</Text>
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
			.then(photo => APIUtil.classifyPhoto(token, photo.base64))
			.then(response => {
				console.log(response)
				setProcessing(false)
				setSuccess(response.prediction.split('-')[0] === 'ripe')
				setAccuracy(response.accuracy)
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
				<Camera style={styles.camera} ref={(ref) => { this.camera = ref }}>
					{processing ? <ActivityIndicator size="large" color="#FFF" style={styles.activity}/> : displayImage(success, accuracy)}
					<View style={styles.cameraButtonContainer}>
						<TouchableOpacity style={styles.cameraButton} onPress={() => takePicture()} disabled={processing}>
							<Icon name={'circle'} size={50} color='#FFF' />
						</TouchableOpacity>
					</View>
				</Camera>
				<TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('HarvestInstruction', { ...props.navigation.state.params })}>
					<Text style={styles.buttonText}>Start Harvesting</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default MLCameraScreen
