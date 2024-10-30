// https://developers.google.com/chart/interactive/docs/gallery/piechart#options
import Chart from 'react-google-charts'
import { useContext } from 'react'
import { AppContext } from '../App'
export default function PieG({ data }: { data: number[] }) {
	const { bodyBgColor, darkTheme } = useContext(AppContext)

	const chartData = [
		['Stars', 'Books'],
		['1 star', data[0]],
		['2 stars', data[1]],
		['3 stars', data[2]],
		['4 stars', data[3]],
		['5 stars', data[4]],
	]

	return (
		<Chart
			chartType="PieChart"
			data={chartData}
			options={{
				backgroundColor: bodyBgColor,
				legend: {
					textStyle: {
						color: darkTheme ? 'white' : 'black',
					},
				},
				chartArea: { left: 0, width: '80%' },
				fontSize: 14,
			}}
		/>
	)
}
