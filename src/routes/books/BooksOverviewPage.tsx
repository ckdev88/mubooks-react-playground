import { useContext } from 'react'
import BookSummary from '../../components/BookSummary'
import { AppContext } from '../../App'
const BooksOverviewPage = ({ books, page }: { books: Books; page: string }) => {
	const { userMyBooks } = useContext(AppContext)
	let savedArr: Books

	// TODO: build further on new feature; highlight saved books in search view
	// if (page === 'searchpage')
	savedArr = JSON.parse(userMyBooks as string)

	return books.map((book) => {
		// if (page === 'searchpage') {
		savedArr.find((savedbook) => {
			if (savedbook.id === book.id) {
				book.list = savedbook.list
			}
		})
		// }

		return <BookSummary book={book} key={book.id} />
	})
}
export default BooksOverviewPage
