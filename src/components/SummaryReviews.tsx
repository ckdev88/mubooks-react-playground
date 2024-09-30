import ReviewTropes from './ReviewTropes'
import BookSummaryReview from './BookSummaryReview'

export default function SummaryReviews({ currentPage, book }: { currentPage: Page; book: Book }) {
	return (
		<div className="reviews">
			{currentPage === 'quoted' && (
				<BookSummaryReview book_id={book.id} review_val={book.review_fav_quote} review_type="quote" />
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
