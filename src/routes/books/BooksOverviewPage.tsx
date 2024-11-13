import { useContext, useState, useEffect } from 'react'
import BookSummary from '../../components/BookSummary'
import { AppContext } from '../../App'
import BooksOverviewFilterSort from '../../components/BooksOverviewFilterSort'

const BooksOverviewPage = ({ books, page }: { books: Books; page: Page }) => {
	const { userMyBooks } = useContext(AppContext)
	const savedArr: Books = userMyBooks
	const fsPages: Page[] = ['wishlist', 'finished', 'favorites', 'savedbooks']

	console.log('userMyBooks:', userMyBooks)
	console.log(
		'userMyBooks finished:',
		userMyBooks.filter((book) => book.date_finished && book.date_finished > 0)
	)
	console.log(
		'userMyBooks finished but no reading',
		userMyBooks.filter((book) => book.date_finished && book.date_finished > 0 && book.date_reading === 0)
	)
	const [processedHash, setProcessedHash] = useState<boolean>(false)
	useEffect(() => {
		if (window.location.hash !== undefined && window.location.hash !== '' && processedHash === false) {
			setTimeout(() => {
				location.href = window.location.hash
			}, 500)
		}
		setProcessedHash(true)
	}, [location])

	return (
		<>
			{fsPages.includes(page) && <BooksOverviewFilterSort />}

			{books.map((book) => {
				if (page === 'search') {
					savedArr.find((savedbook) => {
						if (savedbook.id === book.id) {
							book.list = savedbook.list
							book.date_reading = savedbook.date_reading
							book.date_finished = savedbook.date_finished
						}
					})
				}
				return <BookSummary book={book} key={`BookSummary${book.id}`} currentPage={page} />
			})}
		</>
	)
}
export default BooksOverviewPage
