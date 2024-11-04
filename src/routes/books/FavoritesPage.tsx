import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
import Heading from '../../components/ui/Heading'

const pageTitle: string = 'Favorites'
const currentPage: Page = 'favorites'

const FavoritesPage = () => {
	const { userMyBooks, bookFilter } = useContext(AppContext)

	let hasbooks = false
	let booksFiltered: Books = []
	if (bookFilter !== '' && bookFilter.length > 0)
		booksFiltered = userMyBooks.filter(
			(book: Book) => book.list === 4 && book.title_short.toLowerCase().includes(bookFilter.toLowerCase())
		)
	else booksFiltered = userMyBooks.filter((book: Book) => book.list === 4)
	if (booksFiltered !== undefined) {
		if (booksFiltered.length > 0) {
			booksFiltered.sort((a, b) => Number(b.date_finished) - Number(a.date_finished))
			hasbooks = true
		} else hasbooks = false
	}

	return (
		<>
			<Heading
				text={pageTitle}
				icon={'favs-icon.png'}
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
						) : (
							<>Beloved and adored books: {booksFiltered.length}</>
						)}
					</>
				}
			/>
			{!hasbooks && bookFilter === '' && (
				<>
					<h4>No books marked as favorite yet.</h4>
					<p>
						Select and mark your favorite book from <Link to="/finished">your finished books</Link> add to this list.
					</p>
				</>
			)}
			<BooksOverviewPage books={booksFiltered} page={currentPage} />
		</>
	)
}
export default FavoritesPage
