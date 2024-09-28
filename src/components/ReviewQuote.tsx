import { useState, useCallback, useContext, useEffect } from 'react'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'

const ReviewQuote = ({
	book_id,
	book_review_fav_quote,
}: {
	book_id: Book['id']
	book_review_fav_quote: Book['review_fav_quote']
}) => {
	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [reviewFavQuote, setReviewFavQuote] = useState<Book['review_fav_quote']>(book_review_fav_quote)
	const [showForm, setShowForm] = useState<boolean>(false)
	const [showReviewFavQuote, setShowReviewFavQuote] = useState<boolean>(true)
	const [isModding, setIsModding] = useState<boolean>(false)

	function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const value = cleanInput(e.currentTarget.review_fav_quote.value.trim(), true)
		if (value !== undefined) {
			setIsModding(true)
			setReviewFavQuote(value)
			setShowForm(false)
			setShowReviewFavQuote(true)
		}
	}
	useEffect(() => {
		if (book_review_fav_quote === undefined || book_review_fav_quote.length < 1) setShowForm(true)
	}, [book_review_fav_quote])

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
	const updateReviewQuoteCallback = useCallback(
		async function updateReviewQuote() {
			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book_id) {
					userMyBooks[i].review_fav_quote = reviewFavQuote
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book_id, reviewFavQuote, updateMyBooksCallback]
	)
	// /mod db
	useEffect(() => {
		if (book_review_fav_quote !== reviewFavQuote) {
			if (isModding) {
				updateReviewQuoteCallback()
				setIsModding(false)
			}
		}
	}, [isModding, setUserMyBooks, updateReviewQuoteCallback, book_id, book_review_fav_quote, reviewFavQuote])

	const activateForm = () => {
		setShowForm(true)
		setIsModding(true)
		setShowReviewFavQuote(false)
	}

	const cancelSubmit = (): void => {
		setIsModding(false)
		setShowReviewFavQuote(true)
		setShowForm(false)
	}

	useEffect(() => {
		if (isModding) {
			document.getElementById('review_fav_quote' + book_id)?.focus()
			if (reviewFavQuote !== undefined)
				document.getElementById('review_fav_quote' + book_id)?.setAttribute('value', reviewFavQuote)
		}
		if (reviewFavQuote && reviewFavQuote !== '') setShowReviewFavQuote(true)
		else setShowReviewFavQuote(false)
	}, [showForm, reviewFavQuote, book_id, isModding])

	return (
		<div className="review-text quote">
			{showForm && (
				<>
					<form className="single-small-form clr" onSubmit={processForm}>
						<input
							name="review_fav_quote"
							id={'review_fav_quote' + book_id}
							type="text"
							placeholder="Add your favorite quote..."
						/>
						<BtnInsideCaret />
					</form>
					{reviewFavQuote && (
						<button className="btn-text btn-text-cancel" onClick={cancelSubmit}>
							Cancel
						</button>
					)}
				</>
			)}

			{showReviewFavQuote && <div onClick={activateForm}>“{reviewFavQuote}”</div>}
		</div>
	)
}
export default ReviewQuote
