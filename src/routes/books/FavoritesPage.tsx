import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const FavoritesPage = () => {
	const { userMyBooks } = useContext(AppContext)

	let hasbooks = false
	let books: Books
	let booksFiltered: Books = []

	if (localStorage.getItem('MyBooks') === 'undefined') {
		books = []
	} else {
		books = JSON.parse(userMyBooks as string)
		if (typeof books !== 'object') books = JSON.parse(books)
		booksFiltered = books.filter((book) => book.list === 4)
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>
				Favorites <sub>My beloved, adored, hottest favorite books.</sub>
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
