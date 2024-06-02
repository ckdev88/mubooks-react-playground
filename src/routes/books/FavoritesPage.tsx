import { useContext, useEffect } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const pageTitle = 'Favorites'

const FavoritesPage = () => {
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
					book.list === 4 && book.title_short.toLowerCase().includes(localBookFilter.toLowerCase())
			)
		else booksFiltered = userMyBooks.filter((book: Book) => book.list === 4)
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
						<>My beloved and adored books: {booksFiltered.length}</>
					)}
				</sub>
			</h1>

			{!hasbooks && localBookFilter === '' && (
				<>
					<h4>No books marked as favorite yet.</h4>
					<p>
						Select and mark your favorite book from <Link to="/finished">your finished books</Link> add to
						this list.
					</p>
				</>
			)}
			<BooksOverviewPage books={booksFiltered} page="favoritespage" />
		</>
	)
}
export default FavoritesPage
