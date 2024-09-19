import { useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../../utils/supabase'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'
import { IsModdingPagesContext } from './BookPages'
import BtnInsideCaret from './ui/BtnInsideCaret'
const BookModifyPages = ({
	book_id,
	book_number_of_pages_median,
}: {
	book_id: Book['id']
	book_number_of_pages_median: Book['number_of_pages_median']
}) => {
	const { setIsModdingPages } = useContext(IsModdingPagesContext)
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)
	const [showForm, setShowForm] = useState(false)
	const inputid = 'modifyPagesToBookId' + book_id

	const [bookPages, setBookPages] = useState<number>(book_number_of_pages_median)
	const [isModding, setIsModding] = useState<boolean>(false)
	useEffect(() => {
		if (showForm) setIsModdingPages(true)
		else setIsModdingPages(false)
	}, [setIsModdingPages, showForm])

	// TODO: move this function to generic helper location
	const updateMyBooksCallback = useCallback(
		async function updateMyBooks(myBooksNew: Books) {
			let msg: string
			setUserMyBooks(myBooksNew)
			const { error } = await supabase
				.from('user_entries')
				.update({ json: myBooksNew, testdata: 'updated from book summary: Modify pages' })
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated pages.'
			setPopupNotification(msg)
		},
		[setPopupNotification, setUserMyBooks, userid]
	)

	const updatePagesCallback = useCallback(
		async function updatePages() {
			if (userMyBooks.length < 1) return

			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book_id) {
					if (bookPages !== userMyBooks[i].number_of_pages_median) userMyBooks[i].number_of_pages_median = bookPages
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book_id, bookPages, updateMyBooksCallback]
	)

	function processPagesModifyForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (cleanInput(e.currentTarget.pagesAmount.value) === '') console.log('change nothing')
		else {
			const newvalue: number = Number(cleanInput(e.currentTarget.pagesAmount.value))
			if (newvalue !== undefined && newvalue > -1) {
				setIsModding(true)
				setBookPages(newvalue)
			}
		}
	}

	useEffect(() => {
		if (showForm) document.getElementById(inputid)?.focus()
		if (book_number_of_pages_median !== undefined && bookPages !== book_number_of_pages_median) {
			setBookPages(book_number_of_pages_median)
			if (isModding) {
				updatePagesCallback()
				setIsModdingPages(false)
				setShowForm(false)
			}
		}
	}, [
		showForm,
		bookPages,
		isModding,
		updatePagesCallback,
		book_id,
		book_number_of_pages_median,
		inputid,
		setIsModdingPages,
	])

	return (
		<span
			className={book_number_of_pages_median !== undefined && book_number_of_pages_median > 0 ? 'dflex' : 'dnone'}
			style={{ alignItems: 'center' }}
		>
			<div
				className={showForm ? 'dflex' : 'dnone'}
				style={{ alignContent: 'center', alignItems: 'center', position: 'relative' }}
			>
				<form onSubmit={processPagesModifyForm} className="single-small-form wm6" style={{ marginRight: '.3rem' }}>
					<input
						type="number"
						id={inputid}
						name="pagesAmount"
						defaultValue={
							book_number_of_pages_median !== undefined && book_number_of_pages_median > 0
								? book_number_of_pages_median
								: 0
						}
					/>
					<BtnInsideCaret />
				</form>
			</div>
			<button className="btn-icon" onClick={() => setShowForm(!showForm)}>
				<span className="icon icon-pencil"></span>
			</button>
		</span>
	)
}
export default BookModifyPages
