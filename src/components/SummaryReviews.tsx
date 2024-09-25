import ReviewTropes from './ReviewTropes'
import ReviewText from './ReviewText'
import ReviewQuote from './ReviewQuote'
export default function SummaryReviews({ currentPage, book }: { currentPage: Page; book: Book }) {
	return (
		<div className="reviews">
			{(currentPage === 'finished' || currentPage === 'favorites' || currentPage==='quotedbooks') && (
				<>
				{currentPage!=='quotedbooks' && <ReviewText book_id={book.id} book_review_text={book.review_text} /> }
					<ReviewQuote book_id={book.id} book_review_fav_quote={book.review_fav_quote} />
					<>{currentPage!=='quotedbooks' && book.review_tropes && <ReviewTropes book={book} tropes={book?.review_tropes} />}</>
				</>
			)}
		</div>
	)
}
