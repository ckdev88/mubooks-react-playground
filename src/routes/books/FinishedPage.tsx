import { useContext, useEffect } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const FinishedPage = () => {
	const { userMyBooks, setNavTitle } = useContext(AppContext)
	const pageTitle = 'Finished books'
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])
	let hasbooks = false
	let booksFiltered: Books = []

	if (localStorage.getItem('MyBooks') !== undefined) {
		booksFiltered = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
		booksFiltered.sort((a, b) => Number(b.date_finished) - Number(a.date_finished))
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>
				{pageTitle}
				<sub>Books I finished reading: {booksFiltered.length}</sub>
			</h1>
			<p>Have any favorites? Add them to your favorites from here.</p>
			<h4 className={hasbooks === true ? 'dnone' : 'dblock'}>Not finished any book yet.</h4>
			<p>
				Are you finished with the book you're reading?
				<br />
				Select and mark your <Link to="/reading">currently reading book</Link> as finished.
				<br />
				<br />
			</p>
			<BooksOverviewPage books={booksFiltered} page="finishedpage" />
		</>
	)
}
export default FinishedPage
