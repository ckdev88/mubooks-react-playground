import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const FinishedPage = () => {
	const navigate = useNavigate()
	const { userMyBooks } = useContext(AppContext)

	let hasbooks = false
	let books: Books
	let booksFiltered: Books = []

	if (localStorage.getItem('MyBooks') === 'undefined') {
		books = []
	} else {
		books = JSON.parse(userMyBooks as string)
		if (typeof books !== 'object') books = JSON.parse(books)
		booksFiltered = books.filter((book) => book.finished === true)
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>Finished books</h1>
			<p>
				Books I finished reading. Have any favorites? Add them to your favorites from here.
			</p>
			<div className={hasbooks === true ? 'dnone' : 'dblock'}>
				<h4>No books marked as finished yet.</h4>
				<p>Select and mark your currently reading book as finished.</p>
				<button className="wauto mr1" onClick={() => navigate('/reading')}>
					Currently Reading Books
				</button>
			</div>
			<BooksOverviewPage books={books} page="finishedpage" />
		</>
	)
}
export default FinishedPage
