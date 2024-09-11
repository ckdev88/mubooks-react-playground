import ReviewTropes from './ReviewTropes'
export default function SummaryReviews({currentPage,book}:{currentPage: Page, book: Book}) {
	return (
		<div className="reviews">
			{(currentPage === 'finished' || currentPage === 'favorites') &&
				book.review_tropes &&
				ReviewTropes(book, book?.review_tropes)}
		</div>
	)
}
