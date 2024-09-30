import { useState, useCallback, useContext, useEffect } from 'react'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'

interface PropTypes {
	book_id: Book['id']
	book_review_fav_quote: Book['review_fav_quote']
}
const ReviewQuote = ({ book_id, book_review_fav_quote }: PropTypes) => {
	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [reviewQuote, setReviewQuote] = useState<Book['review_fav_quote']>(book_review_fav_quote)
	const [showForm, setShowForm] = useState<boolean>(false)
	const [showReviewFavQuote, setShowReviewFavQuote] = useState<boolean>(true)
	const [isModding, setIsModding] = useState<boolean>(false)

	function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const value = cleanInput(e.currentTarget.review_fav_quote.value.trim(), true)
		if (value !== undefined) {
			setIsModding(true)
			setReviewQuote(value)
			setShowForm(false)
			setShowReviewFavQuote(true)
		}
	}

	// TODO: move this function to generic helper location
	const updateMyBooksCallback = useCallback(
		async function updateMyBooks(myBooksNew: Books) {
			let msg: string
			setUserMyBooks(myBooksNew)
			const { error } = await supabase
				.from('user_entries')
				.update({ json: myBooksNew, testdata: 'updated from review: quote' })
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
					userMyBooks[i].review_fav_quote = reviewQuote
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book_id, reviewQuote, updateMyBooksCallback]
	)

	// /mod db
	useEffect(() => {
		if (book_review_fav_quote !== reviewQuote) {
			if (isModding) {
				updateReviewQuoteCallback()
				setIsModding(false)
			}
		}
	}, [isModding, setUserMyBooks, updateReviewQuoteCallback, book_id, book_review_fav_quote, reviewQuote])

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
			if (reviewQuote !== undefined)
				document.getElementById('review_fav_quote' + book_id)?.setAttribute('value', reviewQuote)
		}
	}, [showForm, reviewQuote, book_id, isModding])

	return (
		<div className="review-text quote">
			{showForm ? (
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
					<button className="btn-text btn-text-cancel" onClick={cancelSubmit}>
						Cancel
					</button>
				</>
			) : (
				<>
					{(reviewQuote === '' || reviewQuote === undefined) && (
						<button
							className={showForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
							onClick={() => setShowForm(!showForm)}
						>
							+ Quote
						</button>
					)}
				</>
			)}

			{showReviewFavQuote && reviewQuote && <div onClick={activateForm}>“{reviewQuote}”</div>}
		</div>
	)
}
export default ReviewQuote
