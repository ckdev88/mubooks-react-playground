import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanInput } from '../helpers/cleanInput'

const TropesList = (bookTropes: BookTropes, bookid: Id) => {
	if (bookTropes.length < 1) return
	else
		return (
			<ul className="tropes clr">
				{bookTropes.map((trope, index) => (
					<li className="trope" key={'trope' + bookid + index}>
						{trope}
						<button className="btn-x">x</button>
					</li>
				))}
			</ul>
		)
}
const ReviewTropes = (book: Book, tropes: BookTropes) => {
	const { setPopupNotification } = useContext(AppContext)

	const [bookTropes, setBookTropes] = useState<BookTropes>(tropes)
	const [showTropesForm, setShowTropesForm] = useState<boolean>(false)
	function processTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const trope = cleanInput(e.currentTarget.trope_add.value, true)
		console.log('trope?', trope)
		if (trope !== undefined && trope.length > 2) {
			setBookTropes([...bookTropes, trope])
			e.currentTarget.trope_add.value = ''
			e.currentTarget.trope_add.focus()
			// TODO: make trope into data of JSON/database/userMyBooks
			setPopupNotification('Added trope')
		}
		console.log('bookTropes', bookTropes)
	}

	// console.log('reviewtropes', book)
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
