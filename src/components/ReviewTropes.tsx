import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanInput } from '../helpers/cleanInput'
import { supabase } from '../../utils/supabase'

const ReviewTropes = (book: Book, tropes: BookTropes) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)

	const [bookTropes, setBookTropes] = useState<BookTropes>(tropes)
	const [showTropesForm, setShowTropesForm] = useState<boolean>(false)

	const TropesList = (bookTropes: BookTropes, bookid: Id) => {
		if (bookTropes === undefined) return
		if (bookTropes.length < 1) return
		else {
			function removeTrope(trope: string) {
				setBookTropes(bookTropes.filter((bt) => bt !== trope))
				setPopupNotification('Removed trope: ' + trope)
			}
			return (
				<ul className="tropes clr">
					{bookTropes.map((trope, index) => (
						<li className="trope" key={'trope' + bookid + index}>
							{trope}
							<button className="btn-x" onClick={() => removeTrope(trope)}>
								x
							</button>
						</li>
					))}
				</ul>
			)
		}
	}
	// mod db
	// TODO: move this function to generic helper location
	async function MyBooksUpdate(myBooksNew: Books) {
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
	}

	function EditTropes() {
		let myBooks: Books
		if (userMyBooks !== undefined) myBooks = userMyBooks
		else myBooks = []

		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				myBooks[i].tropes = bookTropes
				break
			}
		}

		const myBooksNew: Books = myBooks
		MyBooksUpdate(myBooksNew)
		return myBooksNew
	}

	function EditTropesAct() {
		const newArr: Books = EditTropes()
		setUserMyBooks(newArr)
	}
	// /mod db

	function processTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const trope = cleanInput(e.currentTarget.trope_add.value, true)
		if (trope !== undefined && trope.length > 2) {
			setBookTropes([...bookTropes, trope])
			e.currentTarget.trope_add.value = ''
			e.currentTarget.trope_add.focus()
			setPopupNotification('Added trope: ' + trope)
		}
	}

	useEffect(() => {
		if (tropes !== bookTropes) EditTropesAct()
	}, [bookTropes])

	if (book.tropes === undefined) book.tropes = []

	useEffect(() => {
		if (showTropesForm === true) document.getElementById('trope_add_' + book.id)?.focus()
	}, [showTropesForm])

	return (
		<>
			{TropesList(bookTropes, book.id)}
			<button className="btn-text" onClick={() => setShowTropesForm(!showTropesForm)}>
				<span className={showTropesForm ? 'icon icon-minus' : 'icon icon-add'}></span> Add tropes
			</button>
			{showTropesForm && (
				<form className="tropes-form clr" onSubmit={processTropeAddForm}>
					<input type="text" name="trope_add" id={'trope_add_' + book.id} />
					<button className="btn-submit-inside-caret-right"></button>
				</form>
			)}
		</>
	)
}
export default ReviewTropes
