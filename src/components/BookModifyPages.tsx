import { useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../../utils/supabase'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'
const BookModifyPages = (book: Book) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)
	const [showForm, setShowForm] = useState(false)
	const inputid = 'modifyPagesToBookId' + book.id

	const [bookPages, setBookPages] = useState<number>(book.number_of_pages_median)
	const [isModding, setIsModding] = useState<boolean>(false)

	// TODO: move this function to generic helper location
	async function updateMyBooks(myBooksNew: Books) {
		// console.log(myBooksNew)
		let msg: string
		setUserMyBooks(myBooksNew)
		// console.log('hi')
		const { error } = await supabase
			.from('user_entries')
			.update({ json: myBooksNew, testdata: 'updated from book summary: Modify pages' })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Updated pages.'
		setPopupNotification(msg)
	}

	const updatePagesCallback = useCallback(
		async function updatePages() {
			if (userMyBooks.length < 1) return

			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book.id) {
					if (bookPages !== userMyBooks[i].number_of_pages_median)
						userMyBooks[i].number_of_pages_median = bookPages
					break
				}
			}
			updateMyBooks(userMyBooks)
		},
		[userMyBooks, book.id, bookPages, updateMyBooks]
	)

	function processPagesModifyForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (cleanInput(e.currentTarget.pagesAmount.value) === '') console.log('change nothing')
		else {
			let newvalue: number = Number(cleanInput(e.currentTarget.pagesAmount.value))
			if (newvalue !== undefined && newvalue > -1) {
				setIsModding(true)
				setBookPages(newvalue)
			}
		}
	}

	useEffect(() => {
		if (showForm) document.getElementById(inputid)?.focus()
		if (bookPages !== book.number_of_pages_median) {
			if (isModding) {
				updatePagesCallback()
				setIsModding(false)
				setShowForm(false)
			}
		}
	}, [showForm, bookPages, isModding, updatePagesCallback, book])

	return (
		<>
			&nbsp;
			<button className="btn-text" onClick={() => setShowForm(!showForm)}>
				...
			</button>
			<div className={showForm ? 'dblock' : 'dnone'}>
				<form onSubmit={processPagesModifyForm} className="single-small-form wm6 diblock">
					<input type="number" id={inputid} name="pagesAmount" defaultValue={book.number_of_pages_median} />
					<button type="submit" className="btn-submit-inside-caret-right"></button>
				</form>
			</div>
		</>
	)
}
export default BookModifyPages
