import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './dot-scroll-menu-style'

const DotScrollMenu = props => {
	return (
		<View style={styles.background}>
			<View style={styles.dotBar}>
				{props.greenhouseList.map((greenhouse, index) => (
					<TouchableOpacity key={greenhouse.id} onPress={() => console.log(greenhouse)}>
						<Text style={index === props.current ? styles.current : styles.dot}>•</Text>
					</TouchableOpacity>
				))}
				<TouchableOpacity onPress={() => console.log("add greenhouse")}>
					<Text style={styles.dot}>+</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default DotScrollMenu