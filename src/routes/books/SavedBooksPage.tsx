import { Link } from 'react-router-dom'
import BooksOverviewPage from './BooksOverviewPage'
import { useContext } from 'react'
import { AppContext } from '../../App'

export default function SavedBooksPage() {
	const { userMyBooks } = useContext(AppContext)
	let savedbooks: Books
	let hasBooks: boolean = false
	if (userMyBooks === undefined) savedbooks = []
	else savedbooks = userMyBooks
	if (savedbooks.length > 0) hasBooks = true

	return (
		<>
			<h1>My Books <sub>My books which are in whatever list: {savedbooks.length}</sub></h1>
			<p>
				An overview of my saved books, this includes books that are favorited, read and finished, the wishlist
				and the book currently reading.
			</p>
			<div className={hasBooks === true ? 'dnone' : 'dblock'}>
				<h4>No books added yet, find them and add them.</h4>
				<p>
					<Link to={'/search'} className="wauto">
						Search
					</Link>
				</p>
			</div>
			<BooksOverviewPage books={savedbooks} page="savedbookspage" />
		</>
	)
}
