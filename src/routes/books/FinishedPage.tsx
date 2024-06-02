import { useContext, useEffect } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const pageTitle = 'Finished books'

const FinishedPage = () => {
	const { userMyBooks, setNavTitle, localBookFilter } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])
	let hasbooks = false
	let booksFiltered: Books = []

	if (localStorage.getItem('MyBooks') !== undefined) {
		if (localBookFilter !== '' && localBookFilter.length > 0)
			booksFiltered = userMyBooks.filter(
				(book: Book) =>
					(book.list === 3 || book.list === 4) && book.title_short.toLowerCase().includes(localBookFilter)
			)
		else booksFiltered = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)

		booksFiltered.sort((a, b) => Number(b.date_finished) - Number(a.date_finished))

		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>
				{pageTitle}
				<sub>
					{localBookFilter.length > 0 && booksFiltered.length > 0 ? (
						<>
							Results for <i>{localBookFilter}</i> : {booksFiltered.length}
						</>
					) : localBookFilter.length > 0 && booksFiltered.length === 0 ? (
						<>
							No book titles found for <i>{localBookFilter}.</i>
						</>
					) : (
						<>Books I finished reading: {booksFiltered.length}</>
					)}
				</sub>
			</h1>
			{!hasbooks && localBookFilter === '' && (
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
			<BooksOverviewPage books={booksFiltered} page="finishedpage" />
		</>
	)
}
export default FinishedPage
