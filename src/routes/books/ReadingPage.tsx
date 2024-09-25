import { useContext, useEffect } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const pageTitle = 'Mu books'
const currentPage = 'reading'

const ReadingPage = () => {
	const { userMyBooks, setNavTitle, localBookFilter } = useContext(AppContext)

	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	let hasbooks = false
	let booksFiltered: Books = []

	if (userMyBooks !== undefined) {
		if (localBookFilter !== '' && localBookFilter.length > 0)
			booksFiltered = userMyBooks.filter(
				(book: Book) => book.list === 2 && book.title_short.toLowerCase().includes(localBookFilter)
			)
		else booksFiltered = userMyBooks.filter((book: Book) => book.list === 2)

		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>
				What I'm reading now
				<sub>
					{localBookFilter.length > 0 && booksFiltered.length > 0 ? (
						<>
							Results for <i>{localBookFilter}</i> : {booksFiltered.length}
						</>
					) : localBookFilter.length > 0 && booksFiltered.length === 0 ? (
						<>
							No book titles found for <i>{localBookFilter}.</i>
						</>
					) : booksFiltered.length > 1 ? (
						<>
							Currently enjoying books:&nbsp;
							{booksFiltered.length}
						</>
					) : (
						booksFiltered.length < 1 && <>Nothing, at the moment.</>
					)}
					&nbsp;
				</sub>
			</h1>
			{!hasbooks && localBookFilter === '' && (
				<>
					<p>
						Want to add a book to your reading list?
						<br />
						<Link to="/wishlist">View your wishlist</Link> or <Link to="/search">Search</Link> to add a book.
						<br />
						<br />
					</p>
				</>
			)}
			<BooksOverviewPage books={booksFiltered} page={currentPage} />
		</>
	)
}
export default ReadingPage
