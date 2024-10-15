// docs: https://developers.google.com/chart/interactive/docs/gallery/linechart
import Chart from 'react-google-charts'
import { useContext } from 'react'
import { AppContext } from '../App'
export default function LineG3({ data }: { data: number[] }) {
	const { bodyBgColor, darkTheme } = useContext(AppContext)
	const chartData: (string[] | number[])[] = [['Days from start to finish', 'Number of books per days per book']]

	for (let i = 0; i < data.length; i++) {
		if (data[i] === undefined) continue
		const arrtopush = [i, data[i]]
		chartData.push(arrtopush)
	}

	return (
		<>
			<Chart
				chartType="LineChart"
				data={chartData}
				options={{
					backgroundColor: bodyBgColor,
					curveType: 'function',
					legend: {
						position: 'top',
						textStyle: {
							color: darkTheme ? 'white' : 'black',
							fontSize: '14px',
						},
					},
					hAxis: {
						title: 'Days per book',
						titleTextStyle: { color: darkTheme ? 'white' : 'black' },
						textStyle: { color: darkTheme ? 'white' : 'black' },
						gridlines: {
							count: 0,
						},
					},
					vAxis: {
						title: 'Number of books',
						titleTextStyle: { color: darkTheme ? 'white' : 'black' },
						textStyle: { color: darkTheme ? 'pink' : '#dc3912' },
					},
					colors: ['#ff5f00'],
					chartArea: { left: 40, right: 30 },
					pointSize: 5,
				}}
			/>
		</>
	)
}
