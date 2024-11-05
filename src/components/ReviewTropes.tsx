import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanInput } from '../helpers/cleanInput'
import BtnInsideCaret from './ui/BtnInsideCaret'
import updateEntriesDb from '../functions/updateEntriesDb'

const ReviewTropes = ({ book, tropes }: { book: Book; tropes: BookTropes }) => {
	const { userMyBooks, setPopupNotification, userid } = useContext(AppContext)

	const [bookTropes, setBookTropes] = useState<BookTropes>(tropes)
	const [bookTropesLowercase, setBookTropesLowercase] = useState<BookTropes>([])
	const [showTropesForm, setShowTropesForm] = useState<boolean>(false)

	useEffect(() => {
		setBookTropesLowercase(bookTropes.map((t) => t.toLowerCase()))
	}, [bookTropes])

	function removeTrope(trope: string): void {
		const newArr: BookTropes = bookTropes.filter((bt) => bt !== trope)
		updateTropes(newArr)
	}

	async function updateTropes(newArr: BookTropes) {
		setBookTropes(newArr)
		for (let i = 0; i < userMyBooks.length; i++) {
			if (userMyBooks[i].id === book.id) {
				userMyBooks[i].review_tropes = newArr
				break
			}
		}
		const msg: string = await updateEntriesDb(userMyBooks, userid)
		setPopupNotification(msg)
	}

	// TODO: used in many places as duplicate, refactor into 1 global method
	const TropesList = (bookTropes: BookTropes, bookid: Id) => {
		if (bookTropes === undefined) return
		return (
			<div className="tropes clr mb0">
				{bookTropes.map((trope, index) => (
					<div className="trope badge" key={'trope' + bookid + index}>
						{trope}
						<button className="btn-x" onClick={() => removeTrope(trope)}>
							x
						</button>
					</div>
				))}
				{!showTropesForm && (
					<button
						className={showTropesForm ? 'btn-sm mb0 active trope_add' : 'btn-sm mb0 trope_add'}
						onClick={() => setShowTropesForm(!showTropesForm)}
					>
						{bookTropes.length > 0 ? <>+</> : <>Add Tropes</>}
					</button>
				)}
			</div>
		)
	}

	async function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const tropeToAdd: string = cleanInput(e.currentTarget.trope_add.value, true)
		if (tropeToAdd !== undefined && tropeToAdd.length > 2) {
			const tropeIndex = bookTropesLowercase.indexOf(tropeToAdd.toLowerCase())
			if (bookTropesLowercase.indexOf(tropeToAdd.toLowerCase()) > -1) bookTropes.splice(tropeIndex, 1)
			const newArr: BookTropes = [...bookTropes, tropeToAdd]
			newArr.sort((a, b) => a.localeCompare(b))
			updateTropes(newArr)
			e.currentTarget.trope_add.value = ''
			e.currentTarget.trope_add.focus()
		}
	}

	if (book.review_tropes === undefined) book.review_tropes = []

	useEffect(() => {
		if (showTropesForm === true) document.getElementById('trope_add_' + book.id)?.focus()
	}, [showTropesForm, book.id])

	return (
		<>
			{TropesList(bookTropes, book.id)}
			{showTropesForm && (
				<>
					<form className="single-small-form clr" onSubmit={processForm}>
						<input type="text" name="trope_add" id={'trope_add_' + book.id} placeholder="Add a trope..." />
						<BtnInsideCaret />
					</form>
					<button className="btn-text btn-text-cancel" onClick={() => setShowTropesForm(false)}>
						Cancel
					</button>
				</>
			)}
		</>
	)
}
export default ReviewTropes
