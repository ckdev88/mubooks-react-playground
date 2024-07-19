import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'

const pageTitle = 'Mu Statistics'
const now: Date = new Date()
const currentYear = now.getFullYear()
const currentYearStartDayNr: Date = new Date(currentYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
var currentYearDayNr: number = Math.floor((Number(now) - Number(currentYearStartDayNr)) / oneDay)

const StatisticsPage = () => {
	const { userMyBooks, setNavTitle } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	const getAmount = (year: number, type: StatsAmountTypes): number => {
		let amount = 0
		let amountBooks = 0
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
					if (type === 'pages' && typeof userMyBooks[i].number_of_pages_median === 'number')
						amount += userMyBooks[i].number_of_pages_median
					else if (type === 'pages' && userMyBooks[i].number_of_pages_median === undefined) {
						// TODO: books that have no amount of pages to them can't be counted ...
						// console.log('nope', userMyBooks[i].cover_edition_key)
					}
				}
			}
		}
		if (type === 'daysperbook') {
			if (year === currentYear) amount = Math.floor(currentYearDayNr / amountBooks)
			else amount = Math.floor(365 / amountBooks)
		}
		if (type === 'books') amount = amountBooks
		return amount
	}
	return (
		<>
			<h1>Mu Statistics</h1>
			<h2>Your numbers for {currentYear}</h2>
			<h3>Books finished: {getAmount(currentYear, 'books')}</h3>
			<h3>Pages finished: {getAmount(currentYear, 'pages')}</h3>
			<h3>Average days per book: {getAmount(currentYear, 'daysperbook')}</h3>
			<p>coming soon</p>
			<h3>Reading speed in books and pages</h3>
			<p>coming soon</p>
			<h3>Average day to finish a book</h3>
			<hr />
			<h2>Your numbers for {currentYear - 1}</h2>
			{getAmount(currentYear - 1, 'books') > 0 ? (
				<>
					<h3>Books finished: {getAmount(currentYear - 1, 'books')}</h3>
					<h3>Pages finished: {getAmount(currentYear - 1, 'pages')}</h3>
					<h3>Average days per book: {getAmount(currentYear - 1, 'daysperbook')}</h3>
				</>
			) : (
				<>Nada</>
			)}
			<hr />
			<h2>Your numbers for {currentYear - 2}</h2>
			{getAmount(currentYear - 2, 'books') > 0 ? (
				<>
					<h3>Books finished: {getAmount(currentYear - 2, 'books')}</h3>
					<h3>Pages finished: {getAmount(currentYear - 2, 'pages')}</h3>
					<h3>Average days per book: {getAmount(currentYear - 2, 'daysperbook')}</h3>
				</>
			) : (
				<>Nada</>
			)}
			<hr />
			<h2>Your numbers for {currentYear - 3}</h2>
			{getAmount(currentYear - 3, 'books') > 0 ? (
				<>
					<h3>Books finished: {getAmount(currentYear - 3, 'books')}</h3>
					<h3>Pages finished: {getAmount(currentYear - 3, 'pages')}</h3>
					<h3>Average days per book: {getAmount(currentYear - 3, 'daysperbook')}</h3>
				</>
			) : (
				<>Nada</>
			)}
			<hr />
			<h2>Your numbers for {currentYear - 4}</h2>
			{getAmount(currentYear - 4, 'books') > 0 ? (
				<>
					<h3>Books finished: {getAmount(currentYear - 4, 'books')}</h3>
					<h3>Pages finished: {getAmount(currentYear - 4, 'pages')}</h3>
					<h3>Average days per book: {getAmount(currentYear - 4, 'daysperbook')}</h3>
				</>
			) : (
				<>Nada</>
			)}
			<hr />
			<h2>Your numbers for {currentYear - 5}</h2>
			{getAmount(currentYear - 5, 'books') > 0 ? (
				<>
					<h3>Books finished: {getAmount(currentYear - 5, 'books')}</h3>
					<h3>Pages finished: {getAmount(currentYear - 5, 'pages')}</h3>
					<h3>Average days per book: {getAmount(currentYear - 5, 'daysperbook')}</h3>
				</>
			) : (
				<>Nada</>
			)}
			<hr />
		</>
	)
}

export default StatisticsPage
