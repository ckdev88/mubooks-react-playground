import ReviewTropes from './ReviewTropes'
import ReviewQuote from './ReviewQuote'
import BookSummaryReview from './BookSummaryReview'

export default function SummaryReviews({ currentPage, book }: { currentPage: Page; book: Book }) {
	return (
		<div className="reviews">
			{currentPage === 'quoted' && (
				<ReviewQuote book_id={book.id} book_review_fav_quote={book.review_fav_quote} />
			)}
			{(currentPage === 'finished' || currentPage === 'favorites' || currentPage === 'savedbooks') && (
				<>
					<BookSummaryReview book_id={book.id} review_val={book.review_text} review_type="text" />
					{book.review_tropes && <ReviewTropes book={book} tropes={book?.review_tropes} />}
				</>
			)}
		</div>
	)
}
