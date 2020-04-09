import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { BATTERY_COLOR, WATER_COLOR, PLANT_COLOR } from '../../util/constants'

import styles from './history-styles'

const GreenhouseHistoryDisplay = props => {
	const dates = []
	const battery = []
	const nutrient = []
	const water = []

	props.history.forEach((historical, index) => {
		if(index%3 !== 0) return

		const date = new Date(historical.date)

		dates.push(`${date.getMonth()+1}/${date.getDate()}`)
		battery.push(historical.battery)
		nutrient.push(historical.nutrient_level)
		water.push(historical.water_level)
	})

	return (
		<View style={styles.background}>
			<Text style={styles.text}>Historical Data</Text>
			<LineChart
				data={{
					labels: dates,
					datasets: [
						{
							data: battery,
							color: () => BATTERY_COLOR,
							strokeWidth: 2
						},
						{
							data: water,
							color: () => WATER_COLOR,
							strokeWidth: 2
						},
						{
							data: nutrient,
							color: () => PLANT_COLOR,
							strokeWidth: 2
						}
					],
					legend: ['Battery', 'Water', 'Nutrient']
				}}
				width={ Dimensions.get('window').width }
				height={250}
				formatYLabel={label => Math.round(label) + '%'}
				withShadow={false}
				chartConfig={{
					backgroundColor: '#472600',
					backgroundGradientFrom: '#472600',
					backgroundGradientTo: '#472600',
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: () => 'rgba(255, 255, 255, 1)',
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