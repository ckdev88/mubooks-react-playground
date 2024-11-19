import { useState, useContext, useEffect, createContext } from 'react'
import BookSummary from '../../components/BookSummary'
import { AppContext } from '../../App'
import BooksOverviewFilterSort from '../../components/BooksOverviewFilterSort'
import { TropesPageContext } from './TropesPage'

export const BooksOverviewFilterContext = createContext<BooksOverviewFilterContextType>(
	{} as BooksOverviewFilterContextType
)

const BooksOverviewPage = ({
	books = [],
	page,
	booklist,
}: {
	books?: Books
	page: Page
	booklist: Book['list'] | undefined
}) => {
	const { userMyBooks } = useContext(AppContext)
	const { tropesInMyBooksArr } = useContext(TropesPageContext)

	let booklistStart: Books
	if (books.length > 0) booklistStart = books
	else {
		if (booklist === undefined) booklistStart = userMyBooks
		else {
			if (booklist === 3) booklistStart = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
			else booklistStart = userMyBooks.filter((book: Book) => book.list === booklist)
		}
	}
	if (page === 'finished') {
		// OPTIMIZE this looks like garbage
		booklistStart = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
		books = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
	}
	if (page === 'tropes') books = tropesInMyBooksArr

	let hasbooks: boolean
	if (booklistStart.length > 0) hasbooks = true
	else hasbooks = false

	/** Array of pages which should have a search field to filter the list */
	const fsPages: Page[] = ['wishlist', 'finished', 'favorites', 'savedbooks']

	let hasfilter: boolean
	if (fsPages.includes(page) && hasbooks) hasfilter = true
	else hasfilter = false

	const [booksFilter, setBooksFilter] = useState<string>('')
	const [booksList, setBooksList] = useState<Books>([])

	// PER LIST
	useEffect(() => {
		let bookstmp: Books = []
		if (books.length > 0) bookstmp = books
		if (booklist) {
			if (booklist === 3) {
				bookstmp = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
			} else bookstmp = userMyBooks.filter((book) => book.list === booklist)

			// SORTING
			if (booklist === 3 || booklist === 4) {
				bookstmp.sort((a, b) => (b.date_finished ?? 0) - (a.date_finished ?? 0))
			}
		}
		setBooksList(bookstmp)
	}, [userMyBooks, booklist])

	// TROPES
	useEffect(() => {
		if (page === 'tropes') {
			setBooksList(tropesInMyBooksArr)
		}
	}, [tropesInMyBooksArr])

	// FILTERED
	useEffect(() => {
		if (hasfilter) setBooksList(booklistStart.filter((book) => book.title_short.toLowerCase().includes(booksFilter)))
	}, [booksFilter])

	useEffect(() => {
		if (fsPages.includes(page)) {
			if (window.location.hash !== undefined && window.location.hash !== '') {
				setTimeout(() => {
					location.href = window.location.hash
				}, 500)
			}
		}
	}, [])

	return (
		<>
			{fsPages.includes(page) && (
				<div>
					{hasfilter && (
						<BooksOverviewFilterContext.Provider value={{ setBooksFilter, booksFilter }}>
							<BooksOverviewFilterSort />
							<>
								<div className="h2 resultsfound mt0i">
									{booksFilter.length > 0 && booksList.length > 0 ? (
										<>
											{booksList.length} book{booksList.length !== 1 && <>s</>} found for <em>"{booksFilter}"</em>
										</>
									) : booksFilter.length > 0 && booksList.length === 0 ? (
										<>
											No books found for <em>"{booksFilter}"</em>
										</>
									) : (
										<></>
									)}
								</div>
							</>
						</BooksOverviewFilterContext.Provider>
					)}
				</div>
			)}
			{page === 'search' ? (
				<>
					{books.map((book) => {
						userMyBooks.find((savedbook) => {
							if (savedbook.id === book.id) {
								book.list = savedbook.list
								book.date_reading = savedbook.date_reading
								book.date_finished = savedbook.date_finished
							}
						})
						return <BookSummary book={book} key={`BookSummary${book.id}`} currentPage={page} />
					})}
				</>
			) : (
				booksList.map((book) => {
					if (
						book.list === booklist ||
						page === 'tropes' ||
						booklist === undefined ||
						(booklist === 3 && (book.list === 3 || book.list === 4))
					) {
						return <BookSummary book={book} key={`BookSummary${book.id}`} currentPage={page} />
					}
				})
			)}
		</>
	)
}
export default BooksOverviewPage
