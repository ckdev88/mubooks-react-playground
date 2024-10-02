import { useContext, useEffect } from 'react'
import { IsModdingReviewContext } from './BookSummaryReview'
import BtnInsideCaret from './ui/BtnInsideCaret'
import useChangeReview from '../hooks/useChangeReview'

const BookModifyReview = ({
	book_id,
	review_type,
	review_text,
}: {
	book_id: Book['id']
	review_type: 'text' | 'quote'
	review_text: string // TODO improve type
}) => {
	const { isModding, setIsModding, setReviewText } = useContext(IsModdingReviewContext)
	const [processForm, isModded, newReviewText] = useChangeReview(book_id, review_type, review_text)

	let placeholder: string
	// let inputElement: HTMLElement | null
	if (review_type === 'quote') {
		placeholder = 'Add your favorite quote'
		// inputElement = document.getElementById('review_text_' + book_id)
	} else {
		placeholder = 'Add review'
		// inputElement = document.getElementById('review_quote_' + book_id)
	}

	useEffect(() => {
		if (isModded === true) {
			setIsModding(false)
			setReviewText(newReviewText)
		}
	}, [isModded, setIsModding, newReviewText, setReviewText])

	const cancelSubmit = (): void => {
		setIsModding(false)
	}

	return (
		<>
			<form className="single-small-form clr" onSubmit={processForm}>
				<input
					name="review_text"
					id={'review_' + review_type + '_' + book_id}
					type="text"
					placeholder={placeholder}
					defaultValue={review_text}
				/>
				<BtnInsideCaret />
			</form>

			{isModding && (
				<button className="btn-text btn-text-cancel" onClick={cancelSubmit}>
					Cancel
				</button>
			)}
		</>
	)
}

export default BookModifyReview
