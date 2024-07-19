import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'

const pageTitle = 'Mu Statistics'
const currentYear = new Date().getFullYear()

const StatisticsPage = () => {
	const { userMyBooks, setNavTitle } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	const getAmountBooksFinished = (year: number): number => {
		let amount = 0
		const triggerYearStart = year * 10000
		const triggerYearEnd = triggerYearStart + 10000
		if (year === 2020) console.log('get finished books between', triggerYearStart, '<', triggerYearEnd)
		for (let i = 0; i < userMyBooks.length; i++) {
			if (userMyBooks[i].date_finished === undefined) continue
			if (
				Number(userMyBooks[i].date_finished) > triggerYearStart &&
				Number(userMyBooks[i].date_finished) < triggerYearEnd
			)
				amount++
		}
		return amount
	}

	return (
		<>
			<h1>Mu Statistics</h1>
			<h2>Your numbers for {currentYear}</h2>
			<h3>Books finished: {getAmountBooksFinished(currentYear)}</h3>
			<p>coming soon</p>
			<h3>Reading speed in books and pages</h3>
			<p>coming soon</p>
			<h3>Average day to finish a book</h3>
			<hr />
			<h2>Your numbers for {currentYear - 1}</h2>
			<h3>Books finished: {getAmountBooksFinished(currentYear - 1)}</h3>
			<hr />
			<h2>Your numbers for {currentYear - 2}</h2>
			<h3>Books finished: {getAmountBooksFinished(currentYear - 2)}</h3>
			<hr />
			<h2>Your numbers for {currentYear - 3}</h2>
			<h3>Books finished: {getAmountBooksFinished(currentYear - 3)}</h3>
			<hr />
			<h2>Your numbers for {currentYear - 4}</h2>
			<h3>Books finished: {getAmountBooksFinished(currentYear - 4)}</h3>
			<hr />
			<h2>Your numbers for {currentYear - 5}</h2>
			<h3>Books finished: {getAmountBooksFinished(currentYear - 5)}</h3>
			<hr />
		</>
	)
}

export default StatisticsPage
