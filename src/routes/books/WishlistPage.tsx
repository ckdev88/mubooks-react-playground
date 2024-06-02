import { useContext, useEffect } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const pageTitle = 'Mu Wishlist'

const WishlistPage = () => {
	const { userMyBooks, setNavTitle, localBookFilter } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	let hasbooks = false
	let booksFiltered: Books = []

	if (localStorage.getItem('MyBooks') !== 'undefined') {
		if (localBookFilter !== '' && localBookFilter.length > 0)
			booksFiltered = userMyBooks.filter(
				(book: Book) => book.list === 1 && book.title_short.toLowerCase().includes(localBookFilter)
			)
		else booksFiltered = userMyBooks.filter((book: Book) => book.list === 1)
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
						<> All the books I will read read soon: {booksFiltered.length}</>
					)}
				</sub>
			</h1>
			{!hasbooks && localBookFilter === '' && (
				<>
					<h4>No books on mu wishlist yet.</h4>
					<p>
						Want to add a book to your wishlist?
						<br />
						<Link to="/search">Search</Link> or <Link to="/add-book">Add a book yourself</Link>.<br />
						<br />
					</p>
				</>
			)}
			<BooksOverviewPage books={booksFiltered} page="wishlistpage" />
		</>
	)
}
export default WishlistPage
