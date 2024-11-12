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
	const { isModding, setIsModding } = useContext(IsModdingReviewContext)
	const [processForm] = useChangeReview(book_id, o_key)

	let placeholder: string
	let inputId: string
	let btnClassName: string
	if (o_key === 'review_fav_quote') {
		placeholder = 'Add your favorite quote'
		inputId = 'review_fav_quote_' + book_id
		btnClassName = 'btn-text btn-text-cancel flex-start'
	} else {
		placeholder = 'Add review'
		inputId = 'review_text_' + book_id
		btnClassName = 'btn-text btn-text-cancel'
	}

	useEffect(() => {
		if (isModding) document.getElementById(inputId)?.focus()
	}, [isModding, inputId])

	return (
		<>
			<form className="single-small-form clr" onSubmit={processForm}>
				<input type="text" name="review_text" id={inputId} placeholder={placeholder} defaultValue={review_text} />
				<BtnInsideCaret />
			</form>

			{isModding && (
				<button className={btnClassName} onClick={() => setIsModding(false)}>
					Cancel
				</button>
			)}
		</>
	)
}

export default BookModifyReview
