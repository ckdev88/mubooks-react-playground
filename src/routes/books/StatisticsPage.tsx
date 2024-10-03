// TODO: create graphs when all data is available
import { useContext } from 'react'
import { AppContext } from '../../App'
import StatisticsYear from '../../components/StatisticsYear'

const pageTitle = 'Mu Statistics'
const now: Date = new Date()
const currentYear = now.getFullYear()
let oldestFinishedDate: number = currentYear * 10000
let oldestFinishedYear: number = currentYear

const StatisticsPage = () => {
	const { userMyBooks } = useContext(AppContext)
	const contents = []

	const getOldestFinishedDate = (): number => {
		for (let i = 0; i < userMyBooks.length; i++) {
			if (
				Number(userMyBooks[i].date_finished) > 0 &&
				Number(userMyBooks[i].date_finished) < oldestFinishedDate
			)
				oldestFinishedDate = Number(userMyBooks[i].date_finished)
		}
		return oldestFinishedDate
	}

	oldestFinishedDate = getOldestFinishedDate()
	oldestFinishedYear = Math.floor(oldestFinishedDate / 10000)

	for (let i = currentYear; i > oldestFinishedYear - 1; i--) contents.push(StatisticsYear(i))

	return (
		<>
			<h1>{pageTitle}</h1>
			{contents}
		</>
	)
}

export default StatisticsPage
