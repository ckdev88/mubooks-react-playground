import { HashLink } from 'react-router-hash-link'
import { useContext } from 'react'
import { AppContext } from '../App'
import { cleanAnchor } from '../helpers/cleanInput'

interface ConciseStarsPerBook {
	id: Book['id']
	title_short: Book['title_short']
	rate_stars: Book['rate_stars']
}
type ArrayConciseStarsPerBook = ConciseStarsPerBook[]

type OutputPerStarsAmount = {
	rate_stars: number
	amount: number
	books: {
		id: string
		title_short: string
		rate_stars: number
	}[]
}

function getBooksFinishedInYear(
	inputArray: Books,
	year: number,
	format: 'concise' | 'concise_starsperbook' | 'full'
): Books | ArrayConciseStarsPerBook {
	const arrayFull = inputArray.filter((book) => book.date_finished && Math.floor(book.date_finished / 10000) === year)
	if (format === 'concise_starsperbook') {
		const arrayConcise: ArrayConciseStarsPerBook = []
		for (let i = 0; i < arrayFull.length; i++) {
			const bookToPush: ConciseStarsPerBook = {
				id: arrayFull[i].id,
				title_short: arrayFull[i].title_short,
				rate_stars: arrayFull[i].rate_stars,
			}
			arrayConcise[i] = bookToPush
		}
		return arrayConcise
	}
	return arrayFull
}
function getDpbData(userMyBooks: Books, year: number) {
	const inputArray = getBooksFinishedInYear(userMyBooks, year, 'concise_starsperbook')
	const outputArray: OutputPerStarsAmount[] = []

	const groupedItems: { [rate_stars: number]: OutputPerStarsAmount } = {}

	inputArray.forEach((bitem) => {
		const { id, title_short, rate_stars } = bitem
		if (rate_stars) {
			if (!groupedItems[rate_stars]) {
				groupedItems[rate_stars] = { rate_stars: rate_stars, amount: 0, books: [] }
			}

			groupedItems[rate_stars].amount++
			groupedItems[rate_stars].books.push({ id, title_short, rate_stars })
		}
	})

	for (const rate_stars in groupedItems) {
		outputArray.push(groupedItems[rate_stars])
	}
	return outputArray
}

const StatisticsStarsPerBookInYear = ({ year }: { year: number }) => {
	const { userMyBooks } = useContext(AppContext)
	const dpbd = getDpbData(userMyBooks, year)

	return (
		<div>
			{dpbd.length > 0 &&
				dpbd.map((b, index) => (
					<div key={`dpbd${year}${index}`}>
						{b.rate_stars} stars:{' '}
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
export default StatisticsStarsPerBookInYear
