import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
import Heading from '../../components/ui/Heading'

const pageTitle = `What I'm reading now`
const currentPage = 'reading'

const ReadingPage = () => {
	const { userMyBooks, bookFilter } = useContext(AppContext)

	let hasbooks = false
	let booksFiltered: Books = []

	if (userMyBooks !== undefined) {
		if (bookFilter !== '' && bookFilter.length > 0)
			booksFiltered = userMyBooks.filter(
				(book: Book) => book.list === 2 && book.title_short.toLowerCase().includes(bookFilter)
			)
		else booksFiltered = userMyBooks.filter((book: Book) => book.list === 2)

		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<Heading
				text={pageTitle}
				icon={'save-books-icon.png'}
				sub={
					<>
						{bookFilter.length > 0 && booksFiltered.length > 0 ? (
							<>
								Results for <i>{bookFilter}</i> : {booksFiltered.length}
							</>
						) : bookFilter.length > 0 && booksFiltered.length === 0 ? (
							<>
								No book titles found for <i>{bookFilter}.</i>
							</>
						) : booksFiltered.length > 1 ? (
							<>
								Currently enjoying books:&nbsp;
								{booksFiltered.length}
							</>
						) : (
							booksFiltered.length < 1 && <>Nothing, at the moment.</>
						)}
						&nbsp;
					</>
				}
			/>
			{!hasbooks && bookFilter === '' && (
				<>
					<p>
						Want to add a book to your reading list?
						<br />
						<Link to="/wishlist">View your wishlist</Link> or <Link to="/search">Search</Link> to add a book.
						<br />
						<br />
					</p>
				</>
			)}
			<BooksOverviewPage books={booksFiltered} page={currentPage} />
		</>
	)
}
export default ReadingPage
