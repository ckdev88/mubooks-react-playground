import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"

const ReadingPage = () => {
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

		booksFiltered = books.filter((book) => book.list === 2)
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>What I'm reading now
			<sub>This can later be used to see for how long you enjoyed reading this book: {booksFiltered.length}</sub></h1>
			<h4 className={hasbooks === true ? 'dnone' : 'dblock'}>Currently not reading anything.</h4>
			<p>
				Want to add a book to your reading list?<br />
				<Link to="/wishlist">View your wishlist</Link> or <Link to="/search">Search</Link> to add a book.<br /><br />
			</p>
			<BooksOverviewPage books={booksFiltered} page="readingpage" />
		</>
	)
}
export default ReadingPage
