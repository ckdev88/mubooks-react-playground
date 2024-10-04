import BookSummaryCover from './BookSummaryCover'
import ReviewRating from './ReviewRating'

const reviewRatingPages: Page[] = ['finished', 'favorites', 'tropes']
const BookSummaryAside = ({ book, currentPage }: { book: Book; currentPage: Page }) => {
	return (
		<aside className="aside">
			<BookSummaryCover book_cover={book.cover} book_cover_redir={book.cover_redir} />
			{reviewRatingPages.includes(currentPage) && (
				<ReviewRating
					book_id={book.id}
					book_rate_stars={book.rate_stars}
					book_rate_spice={book.rate_spice}
					book_title_short={book.title_short}
				/>
			)}
		</aside>
	)
}
export default BookSummaryAside
