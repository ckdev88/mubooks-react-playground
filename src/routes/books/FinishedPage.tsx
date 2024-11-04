import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
import Heading from '../../components/ui/Heading'

const pageTitle = 'Finished books'
const currentPage = 'finished'

const FinishedPage = () => {
	const { userMyBooks, bookFilter } = useContext(AppContext)

	let hasbooks = false
	/** bf: Books Filtered */
	let bf: Books = []

	if (bookFilter !== '' && bookFilter.length > 0)
		bf = userMyBooks.filter(
			(book: Book) => (book.list === 3 || book.list === 4) && book.title_short.toLowerCase().includes(bookFilter)
		)
	else bf = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)

	bf.sort((a, b) => Number(b.date_finished) - Number(a.date_finished))

	if (bf !== undefined) {
		if (bf.length > 0) hasbooks = true
		else hasbooks = false
	}

	return (
		<>
			<Heading
				text={pageTitle}
				icon="icon-finished-white.png"
				sub={
					<sub>
						{bookFilter.length > 0 && bf.length > 0 ? (
							<>
								Results for <i>{bookFilter}</i> : {bf.length}
							</>
						) : bookFilter.length > 0 && bf.length === 0 ? (
							<>
								No book titles found for <i>{bookFilter}.</i>
							</>
						) : (
							<>Books I finished reading: {bf.length}</>
						)}
					</sub>
				}
			/>
			{!hasbooks && bookFilter === '' && (
				<>
					<p>Have any favorites? Add them to your favorites from here.</p>
					<h4>Not finished any book yet.</h4>
					<p>
						Are you finished with the book you're reading?
						<br />
						Select and mark your <Link to="/reading">currently reading book</Link> as finished.
						<br />
						<br />
					</p>
				</>
			)}
			<BooksOverviewPage books={bf} page={currentPage} />
		</>
	)
}
export default FinishedPage
