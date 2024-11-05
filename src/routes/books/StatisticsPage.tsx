// TODO: create graphs when all data is available ... STARTED
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import getFinishedBooksStatsYears from '../../functions/getFinishedBooksStatsYears'
import StatisticsYear from '../../components/StatisticsYear'
import Heading from '../../components/ui/Heading'

const StatisticsPage = () => {
	const { userMyBooks } = useContext(AppContext)
	const [years, setYears] = useState<number[]>([])
	const [hasStats, setHasStats] = useState<boolean>(false)
	useEffect(() => {
		const { yearArr } = getFinishedBooksStatsYears(userMyBooks)
		if (yearArr.length > 0) {
			setYears(yearArr)
			setHasStats(true)
		}
	}, [userMyBooks])

	return (
		<>
			{hasStats ? (
				<>
					{years.map((y) => {
						const filteredByYear = userMyBooks.filter(
							(b) => b.date_finished !== undefined && Math.floor(b.date_finished / 10000) === y
						)
						return <StatisticsYear myBooksArr={filteredByYear} year={y} key={`statisticsPageYear${y}`} />
					})}
				</>
			) : (
				<>
					<Heading text="Statistics" sub="See more about your book reading journey" icon="graph-icon.jpg" />
					<p>No stats yet, stats are generated when you finish reading a book and when you rate the book you read.</p>
				</>
			)}
		</>
	)
}

export default StatisticsPage
