import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
import Heading from '../../components/ui/Heading'

const pageTitle: string = 'Favorites'
const currentPage: Page = 'favorites'
const booklist = 4

const FavoritesPage = () => {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks = false
	if (userMyBooks.filter((book) => book.list === booklist).length > 0) hasbooks = true

	return (
		<>
			<Heading text={pageTitle} icon={'icon-favorites.svg'} sub="Beloved and adored books" />
			{!hasbooks && (
				<>
					<h4>No books marked as favorite yet.</h4>
					<p>
						Select and mark your favorite book from <Link to="/finished">your finished books</Link> add to this list.
					</p>
				</>
			)}
			<BooksOverviewPage page={currentPage} booklist={booklist} />
		</>
	)
}
export default FavoritesPage
