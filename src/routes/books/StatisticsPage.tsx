import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'

const pageTitle = 'Mu Statistics'
const now: Date = new Date()
const currentYear = now.getFullYear()
const currentYearStartDayNr: Date = new Date(currentYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
const currentYearDayNr: number = Math.floor((Number(now) - Number(currentYearStartDayNr)) / oneDay)
let oldestFinishedDate:number = currentYear * 10000

const StatisticsPage = () => {
	const { userMyBooks, setNavTitle } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	const getOldestDate = ():number => {
		for (let i = 0; i < userMyBooks.length; i++) {
			if (userMyBooks[i].date_finished > 0 && Number(userMyBooks[i].date_finished) < oldestFinishedDate) {
				oldestFinishedDate = userMyBooks[i].date_finished
				console.log('new oldestFinishedDate',oldestFinishedDate)
			}
		}
		return oldestFinishedDate
	}

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
			<h1>Mu Statistics</h1>
			<h2>{currentYear}</h2>
			Books finished: {getAmount(currentYear, 'books')}<br/>
			Pages finished: {getAmount(currentYear, 'pages')}<br/>
			Average days per book: {getAmount(currentYear, 'daysperbook')}<br/>
			Average pages per day: {getAmount(currentYear, 'pagesperday')}<br/>
			<p>coming soon</p>
			<h3>Reading speed in books and pages</h3>
			<p>coming soon</p>
			<h3>Average day to finish a book</h3>
			<hr />
			<h2>{currentYear - 1}</h2>
			{getAmount(currentYear - 1, 'books') > 0 ? (
				<>
					Books finished: {getAmount(currentYear - 1, 'books')}
					<br />
					Pages finished: {getAmount(currentYear - 1, 'pages')}
					<br />
					Average days per book: {getAmount(currentYear - 1, 'daysperbook')}
					<br />
					Average pages per day: {getAmount(currentYear - 1, 'pagesperday')}
					<br />
				</>
			) : (
				<>Nada</>
			)}
			<hr />
			<h2>{currentYear - 2}</h2>
			{getAmount(currentYear - 2, 'books') > 0 ? (
				<p>
					Books finished: {getAmount(currentYear - 2, 'books')}
					<br />
					Pages finished: {getAmount(currentYear - 2, 'pages')}
					<br />
					Average days per book: {getAmount(currentYear - 2, 'daysperbook')}
					<br />
					Average pages per day: {getAmount(currentYear - 2, 'pagesperday')}
					<br />
				</p>
			) : (
				<p>No numbers for {currentYear - 2}</p>
			)}
			<hr />
			<h2>{currentYear - 3}</h2>
			{getAmount(currentYear - 3, 'books') > 0 ? (
				<p>
					Books finished: {getAmount(currentYear - 3, 'books')}
					<br />
					Pages finished: {getAmount(currentYear - 3, 'pages')}
					<br />
					Average days per book: {getAmount(currentYear - 3, 'daysperbook')}
					<br />
					Average pages per day: {getAmount(currentYear - 3, 'pagesperday')}
					<br />
				</p>
			) : (
				<>Nada</>
			)}
			<hr />
			<h2>{currentYear - 4}</h2>
			{getAmount(currentYear - 4, 'books') > 0 ? (
				<p>
					Books finished: {getAmount(currentYear - 4, 'books')}
					<br />
					Pages finished: {getAmount(currentYear - 4, 'pages')}
					<br />
					Average days per book: {getAmount(currentYear - 4, 'daysperbook')}
					<br />
					Average pages per day: {getAmount(currentYear - 4, 'pagesperday')}
				</p>
			) : (
				<>Nada</>
			)}
			<hr />
			<h2>{currentYear - 5}</h2>
			{getAmount(currentYear - 5, 'books') > 0 ? (
				<>
					Books finished: {getAmount(currentYear - 5, 'books')}
					<br />
					Pages finished: {getAmount(currentYear - 5, 'pages')}
					<br />
					Average days per book: {getAmount(currentYear - 5, 'daysperbook')}
					<br />
					Average pages per day: {getAmount(currentYear - 5, 'pagesperday')}
				</>
			) : (
				<>Nada</>
			)}
			<hr />
		</>
	)
}

export default StatisticsPage
