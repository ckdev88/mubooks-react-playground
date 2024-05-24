import { useState, useCallback, useContext, useEffect } from 'react'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'

const ReviewText = (book: Book, review_text: Book['review_text']) => {
	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [reviewText, setReviewText] = useState<string>(book.review_text)
	const [showForm, setShowForm] = useState<boolean>(false)
	const [showReviewText, setShowReviewText] = useState<boolean>(true)
	const [isModding, setIsModding] = useState<boolean>(false)

	function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const value = cleanInput(e.currentTarget.review_text.value.trim(), true)
		if (value !== undefined && value.length > 2) {
			setIsModding(true)
			setReviewText(value)
			setShowForm(false)
			setShowReviewText(true)
		}
	}
	useEffect(() => {
		if (book.review_text === undefined || book.review_text.length < 1) setShowForm(true)
	}, [book.review_text])

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
			if (userMyBooks.length < 1) return

			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book.id) {
					userMyBooks[i].review_text = reviewText
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book.id, reviewText, updateMyBooksCallback]
	)
	// /mod db
	useEffect(() => {
		if (review_text !== reviewText) {
			if (isModding) {
				updateReviewTextCallback()
				setIsModding(false)
			}
		}
	}, [isModding, setUserMyBooks, updateReviewTextCallback, book.id, review_text, reviewText])

	const activateForm = () => {
		setShowForm(true)
		setShowReviewText(false)
	}

	useEffect(() => {
		if (showForm) {
			document.getElementById('review_text' + book.id)?.focus()
			if (reviewText !== undefined)
				document.getElementById('review_text' + book.id)?.setAttribute('value', reviewText)
		}
	}, [showForm, reviewText, book.id])

	return (
		<div className="review-text">
			{showForm && (
				<form className="single-small-form clr" onSubmit={processForm}>
					<input name="review_text" id={'review_text' + book.id} type="text" placeholder="Add a review..." />
					<button className="btn-submit-inside-caret-right"></button>
				</form>
			)}
			{showReviewText && <div onClick={activateForm}>{reviewText}</div>}
		</div>
	)
}
export default ReviewText
