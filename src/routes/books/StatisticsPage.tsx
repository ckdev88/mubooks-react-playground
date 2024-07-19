import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'

const pageTitle = 'Mu Statistics'
const currentYear = new Date().getFullYear()

const StatisticsPage = () => {
	const { userMyBooks, setNavTitle } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	const getAmount = (year: number, type: 'books' | 'pages'): number => {
		let amount = 0
		const triggerYearStart = year * 10000
		const triggerYearEnd = triggerYearStart + 10000

		for (let i = 0; i < userMyBooks.length; i++) {
			if (userMyBooks[i].date_finished === undefined) continue
			if (
				Number(userMyBooks[i].date_finished) > triggerYearStart &&
				Number(userMyBooks[i].date_finished) < triggerYearEnd
			) {
				if (type === 'books') amount++
				else if (type === 'pages' && typeof userMyBooks[i].number_of_pages_median === 'number')
					amount += userMyBooks[i].number_of_pages_median
				else if (type === 'pages' && userMyBooks[i].number_of_pages_median === undefined) {
					// TODO: books that have no amount of pages to them can't be counted ...
					console.log('nope', userMyBooks[i].cover_edition_key)
				}
			}
		}
		return amount
	}
	return (
		<>
			<h1>Mu Statistics</h1>
			<h2>Your numbers for {currentYear}</h2>
			<h3>Books finished: {getAmount(currentYear, 'books')}</h3>
			<h3>Pages finished: {getAmount(currentYear, 'pages')}</h3>
			<p>coming soon</p>
			<h3>Reading speed in books and pages</h3>
			<p>coming soon</p>
			<h3>Average day to finish a book</h3>
			<hr />
			<h2>Your numbers for {currentYear - 1}</h2>
			<h3>Books finished: {getAmount(currentYear - 1, 'books')}</h3>
			<h3>Pages finished: {getAmount(currentYear - 1, 'pages')}</h3>
			<hr />
			<h2>Your numbers for {currentYear - 2}</h2>
			<h3>Books finished: {getAmount(currentYear - 2, 'books')}</h3>
			<h3>Pages finished: {getAmount(currentYear - 2, 'pages')}</h3>
			<hr />
			<h2>Your numbers for {currentYear - 3}</h2>
			<h3>Books finished: {getAmount(currentYear - 3, 'books')}</h3>
			<h3>Pages finished: {getAmount(currentYear - 3, 'pages')}</h3>
			<hr />
			<h2>Your numbers for {currentYear - 4}</h2>
			<h3>Books finished: {getAmount(currentYear - 4, 'books')}</h3>
			<h3>Pages finished: {getAmount(currentYear - 4, 'pages')}</h3>
			<hr />
			<h2>Your numbers for {currentYear - 5}</h2>
			<h3>Books finished: {getAmount(currentYear - 5, 'books')}</h3>
			<h3>Pages finished: {getAmount(currentYear - 5, 'pages')}</h3>
			<hr />
		</>
	)
}

export default StatisticsPage
