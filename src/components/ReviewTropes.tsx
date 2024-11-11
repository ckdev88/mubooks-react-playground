import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanInput } from '../helpers/cleanInput'
// TODO remove or use BtnInsideCaret, a function should be able to be passed to make it useful
// import BtnInsideCaret from './ui/BtnInsideCaret'
import updateEntriesDb from '../functions/updateEntriesDb'

const ReviewTropes = ({ book, tropes }: { book: Book; tropes: BookTropes }) => {
	const { userMyBooks, setPopupNotification, userid } = useContext(AppContext)
	const [bookTropes, setBookTropes] = useState<BookTropes>(tropes)
	const [bookTropesLowercase, setBookTropesLowercase] = useState<BookTropes>([])
	const [showTropesForm, setShowTropesForm] = useState<boolean>(false)
	const [tropeInputValue, setTropeInputValue] = useState<BookTrope>('')

	useEffect(() => {
		if (bookTropes.length > 0) setBookTropesLowercase(bookTropes.map((t) => t.toLowerCase()))
	}, [bookTropes])

	function removeTrope(trope: string): void {
		let newArr: BookTropes
		if (bookTropes) {
			newArr = bookTropes.filter((bt) => bt !== trope)
			updateTropes(newArr)
		}
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

	// NOTE: similar, but not same as TropesList in ./TropesPrefs.tsx
	const TropesList = (bookTropes: BookTropes, bookid: Id) => {
		return (
			<div className="tropes">
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

	async function addTrope() {
		if (tropeInputValue.trim()) {
			const tropeToAdd: string = cleanInput(tropeInputValue.trim(), true)
			if (tropeToAdd !== undefined && tropeToAdd.length > 1) {
				const tropeIndex = bookTropesLowercase.indexOf(tropeToAdd.toLowerCase())
				if (bookTropesLowercase.indexOf(tropeToAdd.toLowerCase()) > -1) bookTropes.splice(tropeIndex, 1)
				const newArr: BookTropes = [...bookTropes, tropeToAdd]
				newArr.sort((a, b) => a.localeCompare(b))
				updateTropes(newArr)
				setTropeInputValue('')
			}
		}
		document.getElementById(`add_trope_${book.id}`)?.focus()
	}

	if (book.review_tropes === undefined) book.review_tropes = []

	useEffect(() => {
		if (showTropesForm === true) document.getElementById(`add_trope_${book.id}`)?.focus()
	}, [showTropesForm, book.id])

	if (!bookTropes) {
		console.error('bookTropes should never be falsey here! Empty array is allowed though')
		return
	}
	const handleKeyDownTrope = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault()
			addTrope()
		}
	}

	return (
		<>
			{bookTropes && TropesList(bookTropes, book.id)}
			<div className={showTropesForm ? '' : 'dnone'}>
				<div className="single-small-form clr" style={{ alignItems: 'center' }}>
					<input
						type="text"
						id={`add_trope_${book.id}`}
						value={tropeInputValue}
						onChange={(e) => setTropeInputValue(e.target.value)}
						onKeyDown={handleKeyDownTrope}
						placeholder="Add a trope..."
					/>
					<span
						className="btn-submit-inside-caret-right wauto"
						style={{ margin: '0', marginLeft: '-1.7rem' }}
						onClick={addTrope}
					></span>
					{/* <BtnInsideCaret /> */}
				</div>
				<span className="btn-text btn-text-cancel diblock" onClick={() => setShowTropesForm(false)}>
					Cancel
				</span>
			</div>
		</>
	)
}
export default ReviewTropes
