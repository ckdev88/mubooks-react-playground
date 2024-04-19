import AddBookToXButton from './AddBookToXButton'
import RemoveBookFromXButton from './RemoveBookFromXButton'
import BookAuthorList from './BookAuthorList'
import { getBookCover } from '../Helpers'

const BookSummary = ({ book }: BookObject) => {
	return (
		// TODO: add className for when marked as saved
		<article className="book-summary">
			<header>
				<aside className="cover">
					<img
						src={getBookCover(book.cover, 'M') !== undefined ? getBookCover(book.cover, 'M') : 'img/coverless.png'}
						alt=""
					/>
				</aside>
				<div className="in-short">
					<h2>
						{book.title_short}
						<sub>{BookAuthorList(book)}</sub>
					</h2>
					{book.first_publish_year}
					<br />
					{book.number_of_pages_median} pages
					<br />
				</div>
			</header>
			<footer>
				<div className="marks">
					<div className="mark">
						{/* TODO: build further on new feature; highlight saved books in search view */}
						{/* (pathname === '/search' && book.list !== undefined) ? 'SAVED in ' + book.list : 'not saved' */}
						{!book.list && AddBookToXButton(book, 1)}
						{book.list === 1 && RemoveBookFromXButton(book, 1)}
						{book.list === 1 && AddBookToXButton(book, 2)}
						{book.list === 2 && RemoveBookFromXButton(book, 2)}
						{book.list === 2 && AddBookToXButton(book, 3)}
						{book.list === 3 && RemoveBookFromXButton(book, 3)}
						{book.list === 3 && AddBookToXButton(book, 4)}
						{book.list === 4 && RemoveBookFromXButton(book, 4)}
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
