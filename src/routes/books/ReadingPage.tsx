import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"

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
		booksFiltered = books.filter((book) => book.reading === true)
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>What I'm reading now</h1>
			<p>This can later be used to see for how long you enjoyed reading this book.</p>
			<div className={hasbooks === true ? 'dnone' : 'dblock'}>
				<h4>Currently not reading anything.</h4>
				<p>Select a book from Mu Books or use the search.</p>
				<button className="wauto mr1">Mu Books</button>
				<button className="wauto">Search</button>
			</div>
			<BooksOverviewPage books={books} page="readingpage" />
		</>
	)
}
export default ReadingPage
