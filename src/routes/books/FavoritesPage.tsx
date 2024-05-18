import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const FavoritesPage = () => {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks = false
	let booksFiltered: Books = []
	if (localStorage.getItem('MyBooks') !== undefined) {
		booksFiltered = userMyBooks.filter((book: Book) => book.list === 4)
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>
				Favorites <sub>My beloved and adored books: {booksFiltered.length}</sub>
			</h1>

			<h4 className={hasbooks === true ? 'dnone' : 'dblock'}>No books marked as favorite yet.</h4>
			<p>
				Select and mark your favorite book from <Link to="/finished">your finished books</Link> add to this
				list.
			</p>
			<BooksOverviewPage books={booksFiltered} page="favoritespage" />
		</>
	)
}
export default FavoritesPage
