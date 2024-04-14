import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { useNavigate, Link } from "react-router-dom"

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
			<h1>Mu Wishlist</h1>
			<p className="subHead">All the books I will read read soon go here.</p>
			<h4 className={hasbooks === true ? 'dnone' : 'dblock'}>No books on mu wishlist yet.</h4>
			<p>
				Want to add a book to your wishlist?<br />
				<Link to="/search">Search</Link> or <Link to="/add-book">Add a book yourself</Link>.<br /><br />
			</p>
			<BooksOverviewPage books={booksFiltered} page="wishlistpage" />
		</>
	)
}
export default WishlistPage
