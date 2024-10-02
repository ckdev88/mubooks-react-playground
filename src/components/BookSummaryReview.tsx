import { createContext, useState } from 'react'
import BookModifyReview from './BookModifyReview'

export const IsModdingReviewContext = createContext<IsModdingReviewContextType>(
	{} as IsModdingReviewContextType
)

interface PropTypes {
	book_id: Book['id']
	review_type: 'text' | 'quote'
	review_text: Book['review_text']
}
const BookSummaryReview = ({ book_id, review_type, review_text }: PropTypes) => {
	let addButtonTitle: string
	if (review_type === 'quote') addButtonTitle = 'Quote'
	else addButtonTitle = 'Review'

	if (review_text === undefined) review_text = ''
	const [reviewText, setReviewText] = useState<string>(review_text)
	const [isModding, setIsModding] = useState<boolean>(false)

	return (
		<IsModdingReviewContext.Provider
			value={{ isModding, setIsModding, reviewText, setReviewText, review_type }}
		>
			<>
				<div className={`review-text ${review_type}`}>
					{isModding ? (
						<BookModifyReview book_id={book_id} review_type={review_type} review_text={review_text} />
					) : (
						<>
							{reviewText && (
								<div onClick={() => setIsModding(true)}>
									{review_type === 'quote' ? <>{`“${reviewText}”`}</> : <>{reviewText}</>}
								</div>
							)}
							{(reviewText === '' || reviewText === undefined) && isModding === false && (
								<button
									className={isModding ? 'btn-sm mb0 active' : 'btn-sm mb0'}
									onClick={() => setIsModding(true)}
								>
									+ {addButtonTitle}
								</button>
							)}
						</>
					)}
				</div>
			</>
		</IsModdingReviewContext.Provider>
	)
}
export default BookSummaryReview
