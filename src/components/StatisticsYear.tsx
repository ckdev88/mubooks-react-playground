import { useState } from 'react'
import BooksWithoutPagesList from './BooksWithoutPagesList'

const now: Date = new Date()
const currentYear = now.getFullYear()
const currentYearStartDayNr: Date = new Date(currentYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
const currentYearDayNr: number = Math.floor((Number(now) - Number(currentYearStartDayNr)) / oneDay)
let amountBooksWithoutPages = 0
let booksWithoutPages: string[] = []

const StatisticsYear = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
	const [showBooksWithoutPages, setBooksWithoutPages] = useState(false)
	amountBooksWithoutPages = 0
	booksWithoutPages = []
	const getAmount = (year: number, type: StatsAmountTypes): number => {
		let amount = 0
		let amountBooks = 0
		let amountPages = 0
		const triggerYearStart = year * 10000
		const triggerYearEnd = triggerYearStart + 10000

		for (let i = 0; i < myBooksArr.length; i++) {
			if (myBooksArr[i].date_finished === undefined) continue
			if (
				Number(myBooksArr[i].date_finished) > triggerYearStart &&
				Number(myBooksArr[i].date_finished) < triggerYearEnd
			) {
				if (type === 'books' || type === 'daysperbook') amountBooks += 1
				if (type !== 'books') {
					if ((type === 'pages' || type === 'pagesperday') && typeof myBooksArr[i].number_of_pages_median === 'number')
						amountPages += myBooksArr[i].number_of_pages_median
					else if (type === 'pages' && myBooksArr[i].number_of_pages_median === undefined) {
						amountBooksWithoutPages++
						booksWithoutPages.push(myBooksArr[i].title_short)
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

	if (getAmount(year, 'books') > 0)
		return (
			<div key={'StatisticsYear' + year}>
				<h2>{year}</h2>
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
							onClick={() => setBooksWithoutPages(!showBooksWithoutPages)}
							className={
								showBooksWithoutPages
									? 'btn-text caret-right-toggle italic diblock wauto active'
									: 'btn-text caret-right-toggle italic diblock wauto'
							}
						>
							* Books without pages defined{' '}
						</button>
						<div
							className={showBooksWithoutPages ? 'expandable expanded' : 'expandable collapsed'}
							aria-expanded={showBooksWithoutPages}
						>
							<BooksWithoutPagesList arr={booksWithoutPages} />
						</div>
					</i>
				)}
			</div>
		)
}
export default StatisticsYear
