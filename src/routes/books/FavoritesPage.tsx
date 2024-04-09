import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"

const FavoritesPage = () => {
	const { userMyBooks } = useContext(AppContext)

	let hasbooks = false
	let books: Books
	let booksFiltered: Books = []

	if (localStorage.getItem('MyBooks') === 'undefined') {
		books = []
	}
	else {
		books = JSON.parse(userMyBooks as string)
		if (typeof (books) !== 'object') books = JSON.parse(books)
		booksFiltered = books.filter((book) => book.favorite === true)
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>Favorites</h1>
			<p>My beloved favorite books.</p>
			<div className={hasbooks === true ? 'dnone' : 'dblock'}>
				<h4>No books marked as favorite yet.</h4>
				<p>Select and mark your favorite book from Mu Books or use the search.</p>
				<button className="wauto mr1">Mu Books</button>
				<button className="wauto">Search</button>
			</div>
			<BooksOverviewPage books={books} page="favoritespage" />
		</>
	)
}
export default FavoritesPage
