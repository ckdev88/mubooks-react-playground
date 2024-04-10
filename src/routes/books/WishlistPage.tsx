import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { useNavigate } from "react-router-dom"

const WishlistPage = () => {
	const navigate = useNavigate()
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
		booksFiltered = books.filter((book) => book.wishlist === true)
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>Wishlist</h1>
			<p>Books I will read read soon.</p>
			<div className={hasbooks === true ? 'dnone' : 'dblock'}>
				<h4>No books on my wishlist yet.</h4>
				<p>Select a book from Mu Books or use the search.</p>
				<button className="wauto mr1" onClick={() => navigate('/saved-books')}>Mu Books</button>
				<button className="wauto" onClick={() => navigate('/search')}>Search</button>
			</div>
			<BooksOverviewPage books={booksFiltered} page="wishlistpage" />
		</>
	)
}
export default WishlistPage
