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
	/** Input Id */
	let iid: string
	/** Button ClassName */
	let bcn: string
	if (o_key === 'review_fav_quote') {
		placeholder = 'Add your favorite quote'
		iid = 'review_fav_quote_' + book_id
		bcn = 'btn-text btn-text-cancel flex-start'
	} else {
		placeholder = 'Add review'
		iid = 'review_text_' + book_id
		bcn = 'btn-text btn-text-cancel'
	}

	useEffect(() => {
		if (isModded === true) {
			setReviewText(newVal)
			setIsModding(false)
		}
		if (isModding === true) document.getElementById(iid)?.focus()
	}, [isModded, setIsModding, newVal, setReviewText, isModding, iid])

	return (
		<>
			<form className="single-small-form clr" onSubmit={processForm}>
				<input type="text" name="review_text" id={iid} placeholder={placeholder} defaultValue={review_text} />
				<BtnInsideCaret />
			</form>

			{isModding && (
				<button className={bcn} onClick={() => setIsModding(false)}>
					Cancel
				</button>
			)}
		</>
	)
}

export default BookModifyReview
