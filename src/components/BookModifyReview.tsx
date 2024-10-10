import { useContext, useEffect } from 'react'
import { IsModdingReviewContext } from './BookSummaryReview'
import BtnInsideCaret from './ui/BtnInsideCaret'
import useChangeReview from '../hooks/useChangeReview'

const BookModifyReview = ({
	book_id,
	o_key,
	review_text,
}: {
	book_id: Book['id']
	o_key: 'review_text' | 'review_fav_quote'
	review_text: Book['review_text']
}) => {
	const { isModding, setIsModding, setReviewText } = useContext(IsModdingReviewContext)
	const [processForm, isModded, newVal] = useChangeReview(book_id, o_key, review_text)

	let placeholder: string
	if (o_key === 'review_fav_quote') placeholder = 'Add your favorite quote'
	else placeholder = 'Add review'

	useEffect(() => {
		if (isModded === true) {
			setReviewText(newVal)
			setIsModding(false)
		}
	}, [isModded, setIsModding, newVal, setReviewText])

	return (
		<>
			<form className="single-small-form clr" onSubmit={processForm}>
				<input name="review_text" type="text" placeholder={placeholder} defaultValue={review_text} />
				<BtnInsideCaret />
			</form>

			{isModding && (
				<button
					className={o_key === 'review_fav_quote' ? 'btn-text btn-text-cancel flex-start' : 'btn-text btn-text-cancel'}
					onClick={() => setIsModding(false)}
				>
					Cancel
				</button>
			)}
		</>
	)
}

export default BookModifyReview
