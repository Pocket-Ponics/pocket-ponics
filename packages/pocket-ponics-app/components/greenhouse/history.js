import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { BATTERY_COLOR, WATER_COLOR, PLANT_COLOR } from '../../util/constants'

import styles from './history-styles'

const GreenhouseHistoryDisplay = () => {
	return (
		<View style={styles.background}>
			<Text style={styles.text}>Historical Data</Text>
			<LineChart
				data={{
					labels: ['12/1', '12/5', '12/9', '12/13', '12/17', '12/21', '12/25', '12/29', '1/2'],
					datasets: [
						{
							data: [70, 85, 85, 85, 85, 85, 70, 85, 85],
							color: () => BATTERY_COLOR,
							strokeWidth: 2
						},
						{
							data: [60, 50, 100, 90, 80, 70, 60, 50, 100],
							color: () => WATER_COLOR,
							strokeWidth: 2
						},
						{
							data: [80, 75, 70, 65, 60, 55, 50, 100, 95],
							color: () => PLANT_COLOR,
							strokeWidth: 2
						}
					],
					legend: ['Battery', 'Water', 'Nutrient']
				}}
				width={ Dimensions.get('window').width }
				height={250}
				yAxisSuffix={'%'}
				withShadow={false}
				chartConfig={{
					backgroundColor: '#472600',
					backgroundGradientFrom: '#472600',
					backgroundGradientTo: '#472600',
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16
					},
					propsForDots: {
						r: '6',
						strokeWidth: '2',
					}
				}}/>
		</View>
	)
}

export default GreenhouseHistoryDisplay