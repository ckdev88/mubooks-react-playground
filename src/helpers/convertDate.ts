// TODO: move this function to generic helper location
export default function convertDate(
	dateToConvert: number | string,
	outputFormat: 'human' | 'input' | 'normal',
): string {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	let monthNum: number = 0
	let monthName: string = ''
	let a
	let year: number = 0
	let dayNum: number = 0
	if (typeof dateToConvert === 'number') {
		a = new Date(dateToConvert)
		monthNum = a.getMonth()
		year = a.getFullYear()
		dayNum = a.getDate()
		monthName = months[monthNum]
	} else if (typeof dateToConvert === 'string') {
		a = dateToConvert.split('-')
		monthNum = Number(a[1])
		year = Number(a[0])
		dayNum = Number(a[2])
		monthName = months[monthNum - 1]
	}
	let returnvalue: string
	let dayNumPadded: string | number = dayNum
	let monthNumPadded: string | number = monthNum
	if (Number(dayNumPadded) < 9) dayNumPadded = '0' + dayNum.toString()
	if (Number(monthNumPadded) < 9) monthNumPadded = '0' + monthNum.toString()
	switch (outputFormat) {
		case 'human':
			returnvalue = dayNum + ' ' + monthName + ' ' + year
			break
		default:
			returnvalue = year + '-' + monthNumPadded + '-' + dayNumPadded
			break
	}
	return returnvalue
}
