import { useState, useContext, useEffect, useCallback } from 'react'
import { AppContext } from '../App'
import { cleanInput } from '../helpers/cleanInput'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'

const ReviewTropes = (book: Book, tropes: BookTropes) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)

	const [bookTropes, setBookTropes] = useState<BookTropes>(tropes)
	const [showTropesForm, setShowTropesForm] = useState<boolean>(false)
	const [isModding, setIsModding] = useState<boolean>(false)

	function removeTrope(trope: string) {
		setIsModding(true)
		setBookTropes(bookTropes.filter((bt) => bt !== trope))
	}

	const TropesList = (bookTropes: BookTropes, bookid: Id) => {
		if (bookTropes === undefined) return
		return (
			<ul className="tropes clr mb0">
				{bookTropes.map((trope, index) => (
					<li className="trope badge" key={'trope' + bookid + index}>
						{trope}
						<button className="btn-x" onClick={() => removeTrope(trope)}>
							x
						</button>
					</li>
				))}
				{!showTropesForm && (
					<li className="trope_add">
						<button
							className={showTropesForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
							onClick={() => setShowTropesForm(!showTropesForm)}
						>
							{bookTropes.length > 0 ? <>+</> : <>Add tropes</>}
						</button>
					</li>
				)}
			</ul>
		)
	}
	// mod db
	// TODO: move this function to generic helper location
	const updateMyBooksCallback = useCallback(
		async function updateMyBooks(myBooksNew: Books) {
			let msg: string
			setUserMyBooks(myBooksNew)
			const { error } = await supabase
				.from('user_entries')
				.update({ json: myBooksNew, testdata: 'updated from review: Tropes' })
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated tropes.'
			setPopupNotification(msg)
		},
		[setUserMyBooks, setPopupNotification, userid]
	)

	const updateTropesCallback = useCallback(
		async function updateTropes() {
			if (userMyBooks.length < 1) return

			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book.id) {
					userMyBooks[i].review_tropes = bookTropes
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book.id, bookTropes, updateMyBooksCallback]
	)
	// /mod db

	function processTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const trope = cleanInput(e.currentTarget.trope_add.value, true)
		if (trope !== undefined && trope.length > 2) {
			setIsModding(true)
			setBookTropes([...bookTropes, trope])
			e.currentTarget.trope_add.value = ''
			e.currentTarget.trope_add.focus()
		}
	}

	useEffect(() => {
		if (tropes !== bookTropes) {
			if (isModding) {
				updateTropesCallback()
				setIsModding(false)
			}
		}
	}, [tropes, isModding, setUserMyBooks, updateTropesCallback, book.id, bookTropes])

	if (book.review_tropes === undefined) book.review_tropes = []

	useEffect(() => {
		if (showTropesForm === true) document.getElementById('trope_add_' + book.id)?.focus()
	}, [showTropesForm, book.id])

	const cancelSubmit = (): void => {
		setShowTropesForm(false)
		setIsModding(false)
	}

	return (
		<>
			{TropesList(bookTropes, book.id)}
			{showTropesForm && (
				<>
					<form className="single-small-form clr" onSubmit={processTropeAddForm}>
						<input type="text" name="trope_add" id={'trope_add_' + book.id} placeholder="Add a trope..." />
						<BtnInsideCaret />
					</form>
					<button className="btn-text btn-text-cancel" onClick={cancelSubmit}>
						Cancel
					</button>
				</>
			)}
		</>
	)
}
export default ReviewTropes
