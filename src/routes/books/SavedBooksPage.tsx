import { Link } from 'react-router-dom'
import BooksOverviewPage from './BooksOverviewPage'
import { useContext } from 'react'
import { AppContext } from '../../App'

const pageTitle = 'Saved books'
const currentPage = 'savedbooks'

export default function SavedBooksPage() {
	const { userMyBooks, bookFilter } = useContext(AppContext)

	let hasbooks: boolean = false
	let booksFiltered: Books = []
	if (bookFilter !== '' && bookFilter.length > 0)
		booksFiltered = userMyBooks.filter((book: Book) =>
			book.title_short.toLowerCase().includes(bookFilter.toLowerCase())
		)
	else booksFiltered = userMyBooks
	if (booksFiltered !== undefined) {
		if (booksFiltered.length > 0) hasbooks = true
		else hasbooks = false
	}

	return (
		<>
			<h1>
				{pageTitle}
				<sub>
					{bookFilter.length > 0 && booksFiltered.length > 0 ? (
						<>
							Results for <i>{bookFilter}</i> : {booksFiltered.length}
						</>
					) : bookFilter.length > 0 && booksFiltered.length === 0 ? (
						<>
							No book titles found for <i>{bookFilter}.</i>
						</>
					) : (
						<> My books which are in whatever list: {booksFiltered.length} </>
					)}
				</sub>
			</h1>
			{!hasbooks && bookFilter === '' && (
				<>
					<p>
						An overview of my saved books, this includes books that are favorited, read and finished, the wishlist and
						the book currently reading.
					</p>
					<div>
						<h4>No books added yet, find them and add them.</h4>
						<p>
							<Link to={'/search'} className="wauto">
								Search
							</Link>
						</p>
					</div>
				</>
			)}
			<BooksOverviewPage books={booksFiltered} page={currentPage} />
		</>
	)
}
