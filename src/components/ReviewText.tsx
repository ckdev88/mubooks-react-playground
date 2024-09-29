import { useState, useCallback, useContext, useEffect } from 'react'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'

interface ReviewText {
	book_id: Book['id']
	book_review_text: Book['review_text']
}

const ReviewText = ({ book_id, book_review_text }: ReviewText) => {
	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [reviewText, setReviewText] = useState<Book['review_text']>(book_review_text)
	const [showForm, setShowForm] = useState<boolean>(false)
	const [showReviewText, setShowReviewText] = useState<boolean>(true)
	const [isModding, setIsModding] = useState<boolean>(false)

	function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const value = cleanInput(e.currentTarget.review_text.value.trim(), true)
		if (value !== undefined) {
			setIsModding(true)
			setReviewText(value)
			setShowForm(false)
			setShowReviewText(true)
		}
	}

	// mod db
	// TODO: move this function to generic helper location
	const updateMyBooksCallback = useCallback(
		async function updateMyBooks(myBooksNew: Books) {
			let msg: string
			setUserMyBooks(myBooksNew)
			const { error } = await supabase
				.from('user_entries')
				.update({ json: myBooksNew, testdata: 'updated from review: text' })
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated review.'
			setPopupNotification(msg)
		},
		[setUserMyBooks, setPopupNotification, userid]
	)

	const updateReviewTextCallback = useCallback(
		async function updateReviewText() {
			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book_id) {
					userMyBooks[i].review_text = reviewText
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book_id, reviewText, updateMyBooksCallback]
	)

	// /mod db
	useEffect(() => {
		if (book_review_text !== reviewText) {
			if (isModding) {
				updateReviewTextCallback()
				setIsModding(false)
			}
		}
	}, [isModding, setUserMyBooks, updateReviewTextCallback, book_id, book_review_text, reviewText])

	const activateForm = () => {
		setShowForm(true)
		setIsModding(true)
		setShowReviewText(false)
	}

	const cancelSubmit = (): void => {
		setIsModding(false)
		setShowReviewText(true)
		setShowForm(false)
	}

	useEffect(() => {
		if (isModding) {
			document.getElementById('review_text' + book_id)?.focus()
			if (reviewText !== undefined)
				document.getElementById('review_text' + book_id)?.setAttribute('value', reviewText)
		}
	}, [showForm, reviewText, book_id, isModding])

	return (
		<div className="review-text">
			{showForm ? (
				<>
					<form className="single-small-form clr" onSubmit={processForm}>
						<input
							name="review_text"
							id={'review_text' + book_id}
							type="text"
							placeholder="Add a review..."
						/>
						<BtnInsideCaret />
					</form>
					<button className="btn-text btn-text-cancel" onClick={cancelSubmit}>
						Cancel
					</button>
				</>
			) : (
				<>
					{(reviewText === '' || reviewText === undefined) && (
						<button
							className={showForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
							onClick={() => setShowForm(!showForm)}
						>
							Add review
						</button>
					)}
				</>
			)}

			{showReviewText && <div onClick={activateForm}>{reviewText}</div>}
		</div>
	)
}
export default ReviewText
