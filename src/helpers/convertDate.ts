// TODO: move this function to generic helper location
export default function convertDate(dateToConvert: number | string, outputFormat: 'human' | 'input' | 'digit'): string {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	let a
	let monthNum: number = 0
	let monthName: string = ''
	let year: number = 0
	let dayNum: number = 0
	if (typeof dateToConvert === 'number' && dateToConvert < 22221100) {
		// date in digits, like 20230630
		a = dateToConvert.toString().split('')
		monthNum = Number(a[4] + '' + a[5])
		year = Number(a[0] + '' + a[1] + '' + a[2] + '' + a[3])
		dayNum = Number(a[6] + '' + a[7])
		monthName = months[monthNum - 1]
	} else if (typeof dateToConvert === 'number' && dateToConvert > 22221100) {
		// timestamp
		a = new Date(dateToConvert)
		monthNum = a.getMonth() + 1
		year = a.getFullYear()
		dayNum = a.getDate()
		monthName = months[monthNum]
	} else if (typeof dateToConvert === 'string') {
		// date like 2023-06-30, used in calendars, but in input for this function? ... TODO
		a = dateToConvert.split('-')
		monthNum = Number(a[1])
		year = Number(a[0])
		dayNum = Number(a[2])
		monthName = months[monthNum - 1]
	}
	let dayNumPadded: string | number = dayNum
	let monthNumPadded: string | number = monthNum
	if (Number(dayNumPadded) < 10) dayNumPadded = '0' + dayNum.toString()
	if (Number(monthNumPadded) < 10) monthNumPadded = '0' + monthNum.toString()
	switch (outputFormat) {
		case 'human':
			return dayNum + ' ' + monthName + ' ' + year
		case 'digit':
			return year + '' + monthNumPadded + '' + dayNumPadded
		case 'input':
			return year + '-' + monthNumPadded + '-' + dayNumPadded
	}
}
