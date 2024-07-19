import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'

const pageTitle = 'Mu Statistics'
const currentYear = new Date().getFullYear()

const StatisticsPage = () => {
	const { setNavTitle } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	return (
		<>
			<h1>Mu Statistics</h1>
			<h2>Your numbers for {currentYear}</h2>
			<p>coming soon</p>
			<h3>Books finished</h3>
			<p>coming soon</p>
			<h3>Reading speed in books and pages</h3>
			<p>coming soon</p>
			<h3>Average day to finish a book</h3>
			<hr />
		</>
	)
}

export default StatisticsPage
