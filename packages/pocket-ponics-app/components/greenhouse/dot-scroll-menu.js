import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const mockGreenhouseList = [
	{
		id: '1',
		name: "Salad 'Ponic"
	},
	{
		id: '2',
		name: "Pizza 'Ponic"
	}
]

const DotScrollMenu = () => {
	return (
		<View>
			{mockGreenhouseList.map(greenhouse => (
				<TouchableOpacity onPress={() => console.log(greenhouse)}>
					<Text>•</Text>
				</TouchableOpacity>
			))}
			<TouchableOpacity onPress={() => console.log("add greenhouse")}>
				<Text>+</Text>
			</TouchableOpacity>
		</View>
	)
}

export default DotScrollMenu