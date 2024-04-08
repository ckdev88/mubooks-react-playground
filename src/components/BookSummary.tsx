import BookAuthorList from './BookAuthorList'
import SaveBookButton from './SaveBookButton'
import RemoveBookButton from './RemoveBookButton'
import AddToWishlistButton from './AddToWishlistButton'
import RemoveFromWishlistButton from './RemoveFromWishlistButton'
import AddToReadingButton from './AddToReadingButton'
import RemoveFromReadingButton from './RemoveFromReadingButton'

const BookSummary = ({ book }: BookObject) => {
	return (
		// TODO: add className for when marked as saved
		<article className="book-summary" key={book.id}>
			<header>
				<aside className="cover">
					<img src={book.cover !== undefined ? book.cover : 'img/coverless.png'} alt="" />
				</aside>
				<div className="in-short">
					<h2>
						{book.title_short}
						<sub>{BookAuthorList(book)}</sub>
					</h2>
					{book.date_published}
					<br />
					{book.pages} pages
					<br />
				</div>
			</header>
			<footer>
				<div className="marks">
					<div className="mark">
						{!book.saved && SaveBookButton(book)}
						{book.saved && RemoveBookButton(book.id, book?.saved)}<br />
						{!book.wishlist && AddToWishlistButton(book)}
						{book.wishlist && RemoveFromWishlistButton(book.id,book?.wishlist)}<br />
						{!book.reading && AddToReadingButton(book.id)}
						{book.reading && RemoveFromReadingButton(book.id)}<br />
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
