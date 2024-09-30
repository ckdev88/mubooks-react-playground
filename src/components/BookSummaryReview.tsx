import { useState, useCallback, useContext, useEffect } from 'react'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'

interface PropTypes {
	book_id: Book['id']
	review_val: Book['review_text'] | Book['review_fav_quote']
	review_type: 'text' | 'quote'
}
const BookSummaryReview = ({ book_id, review_val, review_type }: PropTypes) => {
	let placeholder: string
	let addButtonTitle: string
	let inputElement: HTMLElement | null
	if (review_type === 'quote') {
		placeholder = 'Add your favorite quote'
		inputElement = document.getElementById('review_text_' + book_id)
		addButtonTitle = 'Quote'
	} else {
		placeholder = 'Add review'
		inputElement = document.getElementById('review_quote_' + book_id)
		addButtonTitle = 'Review'
	}

	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [reviewVal, setReviewVal] = useState<Book['review_text'] | Book['review_fav_quote']>(review_val)
	const [showForm, setShowForm] = useState<boolean>(false)
	const [showReviewVal, setShowReviewVal] = useState<boolean>(true)
	const [isModding, setIsModding] = useState<boolean>(false)

	function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const value = cleanInput(e.currentTarget.review_text.value.trim(), true)
		if (value !== undefined) {
			setIsModding(true)
			setReviewVal(value)
			setShowForm(false)
			setShowReviewVal(true)
		}
	}

	// TODO: move this function to generic helper location
	const updateMyBooksCallback = useCallback(
		async function updateMyBooks(myBooksNew: Books) {
			let msg: string
			setUserMyBooks(myBooksNew)
			const { error } = await supabase
				.from('user_entries')
				.update({ json: myBooksNew, testdata: 'updated from review: ' + review_type })
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated review.'
			setPopupNotification(msg)
		},
		[setUserMyBooks, setPopupNotification, userid, review_type]
	)

	const updateReviewTextCallback = useCallback(
		async function updateReviewText() {
			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book_id) {
					if (review_type === 'text') userMyBooks[i].review_text = reviewVal
					else if (review_type === 'quote') userMyBooks[i].review_fav_quote = reviewVal
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book_id, reviewVal, review_type, updateMyBooksCallback]
	)

	// /mod db
	useEffect(() => {
		if (review_val !== reviewVal) {
			if (isModding) {
				updateReviewTextCallback()
				setIsModding(false)
			}
		}
	}, [isModding, setUserMyBooks, updateReviewTextCallback, book_id, review_val, reviewVal])

	const activateForm = () => {
		setShowForm(true)
		setShowReviewVal(true)
	}

	const cancelSubmit = (): void => {
		setIsModding(false)
		setShowReviewVal(true)
		setShowForm(false)
	}

	useEffect(() => {
		if (showForm === true) {
			inputElement = document.getElementById(`review_${review_type}_${book_id}`)
			inputElement?.focus()
		}
		if (showForm) {
			if (reviewVal !== undefined) inputElement?.setAttribute('value', reviewVal)
		}
	}, [showForm, reviewVal, review_type, inputElement, book_id, isModding])

	return (
		<>
			<div className={`review-text ${review_type}`}>
				{showForm ? (
					<>
						<form className="single-small-form clr" onSubmit={processForm}>
							<input
								name="review_text"
								id={'review_' + review_type + '_' + book_id}
								type="text"
								placeholder={placeholder}
							/>
							<BtnInsideCaret />
						</form>

						<button className="btn-text btn-text-cancel" onClick={cancelSubmit}>
							Cancel
						</button>
					</>
				) : (
					<>
						{showReviewVal && reviewVal && (
							<div onClick={activateForm}>
								{review_type === 'quote' ? <>{`“${reviewVal}”`}</> : <>{reviewVal}</>}
							</div>
						)}
					</>
				)}

				{(reviewVal === '' || reviewVal === undefined) && showForm === false && (
					<button
						className={showForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
						onClick={() => setShowForm(!showForm)}
					>
						+ {addButtonTitle}
					</button>
				)}
			</div>
		</>
	)
}
export default BookSummaryReview
