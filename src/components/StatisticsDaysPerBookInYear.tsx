import { HashLink } from 'react-router-hash-link'
import { useContext } from 'react'
import { AppContext } from '../App'
import { getDurationDays } from '../Helpers'
import { cleanAnchor } from '../helpers/cleanInput'

interface ConciseDaysPerBook {
	id: Book['id']
	title_short: Book['title_short']
	days: Book['days']
}
type ArrayConciseDaysPerBook = ConciseDaysPerBook[]

type OutputPerDaysAmount = {
	amount: number
	books: {
		id: string
		title_short: string
		days: number
	}[]
}

function getBooksFinishedInYear(
	inputArray: Books,
	year: number,
	format: 'concise' | 'concise_daysperbook' | 'full'
): Books | ArrayConciseDaysPerBook {
	const arrayFull = inputArray.filter((book) => book.date_finished && Math.floor(book.date_finished / 10000) === year)
	if (format === 'concise_daysperbook') {
		// OPTIMIZE might be quicker to just append 'days' into database
		const arrayConcise: ArrayConciseDaysPerBook = []
		for (let i = 0; i < arrayFull.length; i++) {
			const bookToPush: ConciseDaysPerBook = {
				id: arrayFull[i].id,
				title_short: arrayFull[i].title_short,
				days: getDurationDays(arrayFull[i].date_reading, arrayFull[i].date_finished),
			}
			arrayConcise[i] = bookToPush
		}
		return arrayConcise
	}
	return arrayFull
}
function getDpbData(userMyBooks: Books, year: number) {
	const inputArray = getBooksFinishedInYear(userMyBooks, year, 'concise_daysperbook')
	const outputArray: OutputPerDaysAmount[] = []

	const groupedItems: { [days: number]: OutputPerDaysAmount } = {}

	inputArray.forEach((bitem) => {
		const { id, title_short, days } = bitem
		if (days) {
			if (!groupedItems[days]) {
				groupedItems[days] = { amount: 0, books: [] }
			}

			groupedItems[days].amount++
			groupedItems[days].books.push({ id, title_short, days })
		}
	})

	for (const key in groupedItems) {
		outputArray.push(groupedItems[key])
	}
	return outputArray
}

const StatisticsDaysPerBookInYear = ({ year }: { year: number }) => {
	const { userMyBooks } = useContext(AppContext)
	const dpbd = getDpbData(userMyBooks, year)

	return (
		<div>
			{dpbd.length > 0 &&
				dpbd.map((b, index) => (
					<div key={`${index}`}>
						{index} days:{' '}
						<b>
							{b.amount} {b.amount === 1 ? 'book' : 'books'}{' '}
						</b>
						<ul className="mt0">
							{b.books.map((book, index) => {
								const refer: string = '/finished' + `#${cleanAnchor(book.title_short)}_${book.id}`
								return (
									<li key={`bokmap${index}`}>
										<HashLink to={refer} className="a-text">
											{book.title_short}
										</HashLink>
									</li>
								)
							})}
						</ul>
					</div>
				))}
		</div>
	)
}
export default StatisticsDaysPerBookInYear
