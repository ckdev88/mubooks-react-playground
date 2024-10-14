import Chart from 'react-google-charts'
import { useContext } from 'react'
import { AppContext } from '../App'
export default function LineG2({ data, data2, subjects }: { data: number[]; data2: number[]; subjects: string[] }) {
	const { bodyBgColor, darkTheme } = useContext(AppContext)

	const chartData = [
		['Month', subjects[0], subjects[1]],
		['J', data[0], data2[0]],
		['F', data[1], data2[1]],
		['M', data[2], data2[2]],
		['A', data[3], data2[3]],
		['M', data[4], data2[4]],
		['J', data[5], data2[5]],
		['J', data[6], data2[6]],
		['A', data[7], data2[7]],
		['S', data[8], data2[8]],
		['O', data[9], data2[9]],
		['N', data[10], data2[10]],
		['D', data[11], data2[11]],
	]

	return (
		<Chart
			chartType="LineChart"
			data={chartData}
			options={{
				// curveType: 'function',
				backgroundColor: bodyBgColor,
				legend: {
					position: 'bottom',
					textStyle: {
						color: darkTheme ? 'white' : 'black',
						fontSize: '14px',
					},
				},
				vAxes: {
					0: {
						title: '',
						minValue: 0,
						textStyle: { color: darkTheme ? 'lightblue' : 'blue' },
						titleTextStyle: { color: darkTheme ? 'white' : 'black' },
					},
					1: {
						title: '',
						minValue: 0,
						textStyle: { color: darkTheme ? 'pink' : 'red' },
						titleTextStyle: { color: darkTheme ? 'white' : 'black' },
					},
				},
				series: {
					0: { targetAxisIndex: 0 },
					1: { targetAxisIndex: 1 },
				},
				chartArea: { left: 17 },
			}}
		/>
	)
}
