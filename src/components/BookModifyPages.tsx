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
					if (bookPages !== userMyBooks[i].number_of_pages_median) {
						// console.log('changing pages of book', userMyBooks[i].title_short, 'to amount', bookPages)
						userMyBooks[i].number_of_pages_median = bookPages
					}
					break
				}
			}
			updateMyBooks(userMyBooks)
		},
		[userMyBooks, book.id, bookPages, updateMyBooks]
	)

	function processPagesModifyForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		let newvalue: number = Number(cleanInput(e.currentTarget.pagesAmount.value))
		if (newvalue !== undefined && newvalue > 0) {
			setIsModding(true)
			setBookPages(newvalue)
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
	}, [showForm, bookPages, isModding, updatePagesCallback])

	return (
		<>
			&nbsp;
			<button className="btn-text" onClick={() => setShowForm(!showForm)}>
				...
			</button>
			<form className={showForm ? 'dblock' : 'dnone'} onSubmit={processPagesModifyForm}>
				<input type="number" id={inputid} name="pagesAmount" />
			</form>
		</>
	)
}
export default BookModifyPages
