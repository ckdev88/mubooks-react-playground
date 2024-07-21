import { useContext } from 'react'
import { AppContext } from '../App'

const now: Date = new Date()
const currentYear = now.getFullYear()
const currentYearStartDayNr: Date = new Date(currentYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
const currentYearDayNr: number = Math.floor((Number(now) - Number(currentYearStartDayNr)) / oneDay)

const StatisticsYear = (year: number) => {
	const { userMyBooks } = useContext(AppContext)

	const getAmount = (year: number, type: StatsAmountTypes): number => {
		let amount = 0
		let amountBooks = 0
		let amountPages = 0
		const triggerYearStart = year * 10000
		const triggerYearEnd = triggerYearStart + 10000

		for (let i = 0; i < userMyBooks.length; i++) {
			if (userMyBooks[i].date_finished === undefined) continue
			if (
				Number(userMyBooks[i].date_finished) > triggerYearStart &&
				Number(userMyBooks[i].date_finished) < triggerYearEnd
			) {
				if (type === 'books' || type === 'daysperbook') amountBooks += 1
				if (type !== 'books') {
					if (
						(type === 'pages' || type === 'pagesperday') &&
						typeof userMyBooks[i].number_of_pages_median === 'number'
					)
						amountPages += userMyBooks[i].number_of_pages_median
					else if (type === 'pages' && userMyBooks[i].number_of_pages_median === undefined) {
						// TODO: books that have no amount of pages to them can't be counted ...
						// console.log('nope', userMyBooks[i].cover_edition_key)
					}
				}
			}
		}

		if (type === 'books') amount = amountBooks
		else if (type === 'pages') amount = amountPages
		else if (type === 'daysperbook') {
			if (year === currentYear) amount = Math.floor(currentYearDayNr / amountBooks)
			else amount = Math.floor(365 / amountBooks)
		} else if (type === 'pagesperday') {
			if (year === currentYear) amount = Math.floor(amountPages / currentYearDayNr)
			else amount = Math.floor(amountPages / 365)
		}

		return amount
	}

	return (
		<>
			<h2>{year}.</h2>
			Books finished: {getAmount(year, 'books')}
			<br />
			Pages finished: {getAmount(year, 'pages')}
			<br />
			Average days per book: {getAmount(year, 'daysperbook')}
			<br />
			Average pages per day: {getAmount(year, 'pagesperday')}
		</>
	)
}
export default StatisticsYear
