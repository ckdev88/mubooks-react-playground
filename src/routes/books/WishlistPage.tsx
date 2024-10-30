// TODO tropes are not shown, intentionally, make it an option maybe?
import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const pageTitle = 'Mu Wishlist'
const currentPage = 'wishlist'

const WishlistPage = () => {
	const { userMyBooks, bookFilter } = useContext(AppContext)

	let hasbooks = false
	let booksFiltered: Books = []

	if (bookFilter !== '' && bookFilter.length > 0)
		booksFiltered = userMyBooks.filter(
			(book: Book) => book.list === 1 && book.title_short.toLowerCase().includes(bookFilter)
		)
	else booksFiltered = userMyBooks.filter((book: Book) => book.list === 1)
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
						<> All the books I will read soon: {booksFiltered.length}</>
					)}
				</sub>
			</h1>
			{!hasbooks && bookFilter === '' && (
				<>
					<h4>No books on mu wishlist yet.</h4>
					<p>
						Want to add a book to your wishlist?
						<br />
						<Link to="/search">Search</Link> or <Link to="/add-book">Add a book yourself</Link>.
						<br />
						<br />
						<Link to="/reading">See my reading list.</Link>
						<br />
					</p>
				</>
			)}
			<BooksOverviewPage books={booksFiltered} page={currentPage} />
		</>
	)
}
export default WishlistPage
