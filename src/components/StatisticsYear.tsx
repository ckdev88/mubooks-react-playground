import { useContext, useState } from 'react'
import { AppContext } from '../App'
import BooksWithoutPagesList from './BooksWithoutPagesList'

const now: Date = new Date()
const currentYear = now.getFullYear()
const currentYearStartDayNr: Date = new Date(currentYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
const currentYearDayNr: number = Math.floor((Number(now) - Number(currentYearStartDayNr)) / oneDay)
let amountBooksWithoutPages = 0
let booksWithoutPages: string[] = []

const StatisticsYear = (year: number) => {
	const { userMyBooks } = useContext(AppContext)
	const [showToggle, setShowToggle] = useState(false)

	amountBooksWithoutPages = 0
	booksWithoutPages = []
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
						amountBooksWithoutPages++
						booksWithoutPages.push(userMyBooks[i].title_short)
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

	const divkey = 'StatisticsYear' + year

	if (getAmount(year, 'books') > 0)
		return (
			<div key={divkey}>
				<h2>{year}.</h2>
				Books finished: {getAmount(year, 'books')}
				<br />
				Pages finished: {getAmount(year, 'pages')}
				{amountBooksWithoutPages > 0 && <small>*</small>}
				<br />
				Average days per book: {getAmount(year, 'daysperbook')}
				<br />
				Average pages per day: {getAmount(year, 'pagesperday')}
				{amountBooksWithoutPages > 0 && <small>*</small>}
				<br />
				{amountBooksWithoutPages > 0 && (
					<i>
						<button
							onClick={() => setShowToggle(!showToggle)}
							className={
								showToggle
									? 'btn-text caret-right-toggle italic diblock wauto active'
									: 'btn-text caret-right-toggle italic diblock wauto'
							}
						>
							* Books without pages defined{' '}
						</button>
						{showToggle && <>{BooksWithoutPagesList(booksWithoutPages)}</>}
					</i>
				)}
			</div>
		)
}
export default StatisticsYear
