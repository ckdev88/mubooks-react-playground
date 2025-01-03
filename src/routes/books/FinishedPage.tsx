import BooksOverviewPage from './BooksOverviewPage'
import { Link } from 'react-router-dom'
import Heading from '../../components/ui/Heading'
import { useContext } from 'react'
import { AppContext } from '../../App'

const pageTitle = 'Finished books'
const currentPage = 'finished'
const booklist = 3

const FinishedPage = () => {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks = false
	if (userMyBooks.filter((book) => book.list === booklist || book.list === 4).length > 0) hasbooks = true // OPTIMIZE this is a bit meh

	return (
		<>
			<Heading text={pageTitle} icon="icon-finished.svg" sub="Books I finished reading" />
			{!hasbooks && (
				<>
					<p>Have any favorites? Add them to your favorites from here.</p>
					<h4>Not finished any book yet.</h4>
					<p>
						Are you finished with the book you're reading?
						<br />
						Select and mark your <Link to="/reading">currently reading book</Link> as finished.
						<br />
						<br />
					</p>
				</>
			)}
			<BooksOverviewPage page={currentPage} booklist={booklist} />
		</>
	)
}
export default FinishedPage
