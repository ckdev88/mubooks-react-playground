import { useState, useCallback, useContext, useEffect } from 'react'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'

const ReviewQuote = (book: Book, review_fav_quote: Book['review_fav_quote']) => {
	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [reviewFavQuote, setReviewFavQuote] = useState<Book['review_fav_quote']>(book.review_fav_quote)
	const [showForm, setShowForm] = useState<boolean>(false)
	const [isModding, setIsModding] = useState<boolean>(false)

	function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const value = cleanInput(e.currentTarget.review_fav_quote.value.trim(), true)
		if (value !== undefined) {
			setReviewFavQuote(value)
			setShowForm(false)
			setIsModding(false)
		}
	}
	useEffect(() => {
		if (book.review_fav_quote === undefined || book.review_fav_quote.length < 1) setShowForm(true)
	}, [book.review_fav_quote, reviewFavQuote])

	// mod db
	// TODO: move this function to generic helper location
	const updateMyBooksCallback = useCallback(
		async function updateMyBooks(myBooksNew: Books) {
			let msg: string
			setUserMyBooks(myBooksNew)
			const { error } = await supabase
				.from('user_entries')
				.update({ json: myBooksNew, testdata: 'updated from review: favourite quote' })
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
				if (userMyBooks[i].id === book.id) {
					userMyBooks[i].review_fav_quote = reviewFavQuote
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
			setIsModding(false)
		},
		[userMyBooks, book.id, reviewFavQuote, updateMyBooksCallback]
	)
	// /mod db
	useEffect(() => {
		if (review_fav_quote !== reviewFavQuote) {
			updateReviewTextCallback()
			setIsModding(false)
		}
	}, [isModding, setUserMyBooks, updateReviewTextCallback, book.id, review_fav_quote, reviewFavQuote])

	const activateForm = () => {
		setShowForm(true)
		setIsModding(true)
	}
	const cancelSubmit = (): void => {
		setIsModding(false)
		setShowForm(false)
	}

	useEffect(() => {
		if (isModding) {
			document.getElementById('review_fav_quote' + book.id)?.focus()
			if (reviewFavQuote !== undefined)
				document.getElementById('review_fav_quote' + book.id)?.setAttribute('value', reviewFavQuote)
		}
	}, [showForm, reviewFavQuote, book.id, isModding])

	return (
		<div className="review-text quote">
			{showForm && (
				<>
					<form className="single-small-form clr" onSubmit={processForm}>
						<input
							name="review_fav_quote"
							id={'review_fav_quote' + book.id}
							type="text"
							placeholder="Add your favorite quote..."
						/>
						<button className="btn-submit-inside-caret-right"></button>
					</form>
					{reviewFavQuote && (
						<button className="btn-text btn-text-cancel" onClick={cancelSubmit}>
							Cancel
						</button>
					)}
				</>
			)}

			{!isModding && reviewFavQuote && Number(reviewFavQuote.length) > 0 && (
				<main onClick={() => activateForm()}>{reviewFavQuote}</main>
			)}
		</div>
	)
}
export default ReviewQuote
