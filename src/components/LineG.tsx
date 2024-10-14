import Chart from 'react-google-charts'
import { useContext } from 'react'
import { AppContext } from '../App'
export default function LineG({ data }: { data: number[] }) {
	const { bodyBgColor, darkTheme } = useContext(AppContext)

	const chartData = [
		['Month', 'Books'],
		['January', data[0]],
		['February', data[1]],
		['March', data[2]],
		['April', data[3]],
		['May', data[4]],
		['June', data[5]],
		['July', data[6]],
		['August', data[7]],
		['September', data[8]],
		['October', data[9]],
		['November', data[10]],
		['December', data[11]],
	]

	return (
		<Chart
			chartType="Line"
			data={chartData}
			options={{
				backgroundColor: bodyBgColor,
				legend: {
					textStyle: {
						color: darkTheme ? 'white' : 'black',
						fontSize: '14px',
					},
				},
			}}
		/>
	)
}
