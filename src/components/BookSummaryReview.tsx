import { createContext, useState } from 'react'
import BookModifyReview from './BookModifyReview'

export const IsModdingReviewContext = createContext<IsModdingReviewContextType>({} as IsModdingReviewContextType)

interface PropTypes {
	book_id: Book['id']
	o_key: 'review_text' | 'review_fav_quote'
	review_text: Book['review_text']
}
const BookSummaryReview = ({ book_id, o_key, review_text }: PropTypes) => {
	let addButtonTitle: string
	if (o_key === 'review_fav_quote') addButtonTitle = 'Quote'
	else addButtonTitle = 'Review'

	if (review_text === undefined) review_text = ''
	const [reviewText, setReviewText] = useState<string>(review_text)
	const [isModding, setIsModding] = useState<boolean>(false)

	return (
		<IsModdingReviewContext.Provider value={{ isModding, setIsModding, reviewText, setReviewText, o_key }}>
			<div className={`review-text ${o_key} pt05`}>
				{isModding ? (
					<BookModifyReview book_id={book_id} o_key={o_key} review_text={reviewText} />
				) : (
					<>
						{reviewText && (
							<div onClick={() => setIsModding(true)}>
								{o_key === 'review_fav_quote' ? <>{`“${reviewText}”`}</> : <>{reviewText}</>}
							</div>
						)}
						{(reviewText === '' || reviewText === undefined) && isModding === false && (
							<button
								className={o_key === 'review_fav_quote' ? 'btn-sm mb mxauto ml0 mt0' : 'btn-sm mb0 ml0'}
								onClick={() => setIsModding(true)}
							>
								Add {addButtonTitle}
							</button>
						)}
					</>
				)}
			</div>
		</IsModdingReviewContext.Provider>
	)
}
export default BookSummaryReview
