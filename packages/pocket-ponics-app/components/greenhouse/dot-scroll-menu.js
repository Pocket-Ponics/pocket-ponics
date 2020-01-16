import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import styles from './dot-scroll-menu-style'

const DotScrollMenu = props => {
	if(props.greenhouseList.length < 2) return null
	
	return (
		<View style={styles.background}>
			<View style={styles.dotBar}>
				{props.greenhouseList.map((greenhouse, index) => {
					if(index === props.greenhouseList.length - 1){
						return (
							<TouchableOpacity key={index} onPress={() => props.swapItem(index)}>
								<Text style={index === props.current ? styles.current : styles.dot}>+</Text>
							</TouchableOpacity>
						)
					}
					return (
						<TouchableOpacity key={index} onPress={() => props.swapItem(index)}>
							<Text style={index === props.current ? styles.current : styles.dot}>•</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}

export default DotScrollMenu