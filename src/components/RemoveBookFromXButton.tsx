import { useContext, useState } from 'react'
import { AppContext } from '../App'
import getListName from '../functions/getListName'
import useMyBooksUpdateDb from '../hooks/useMyBooksUpdateDb'

const RemoveBookFromXButton = ({
	book_id,
	book_list,
	targetList,
	icon = false,
}: {
	book_id: Book['id']
	book_list: Book['list']
	targetList: BookList
	icon: boolean
}) => {
	const { userMyBooks, setUserMyBooks } = useContext(AppContext)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const msg = 'Removed book'
	const updateMyBooksDb = useMyBooksUpdateDb({ myBooksNew: userMyBooks, book_id: null, msg })

	function RemoveBookFromX(book_id: Book['id']) {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = userMyBooks

		if (book_list === 4) {
			for (let i = 0; i < myBooks.length; i++) {
				if (myBooks[i].id === book_id) {
					myBooks[i].list = 3
					break
				}
			}
		} else if (book_list === 3) {
			for (let i = 0; i < myBooks.length; i++) {
				if (myBooks[i].id === book_id) {
					myBooks[i].list = 2
					myBooks[i].date_finished = undefined
					break
				}
			}
		} else {
			let removeIndex = 0
			for (let i = 0; i < myBooks.length; i++) {
				if (myBooks[i].id === book_id) {
					book_list = 0
					removeIndex = i
					break
				}
			}
			myBooks.splice(removeIndex, 1)
		}
		const myBooksNew: Books = myBooks
		return myBooksNew
	}

	function fadeout(): void {
		/** Temporary Current Page, taken from url */
		// OPTIMIZE: this same function is used in RemoveBookFromXButton & AddBookToXButton
		const tcp = window.location.pathname.replace('/', '')
		// OPTIMIZE: the finished one is a bit weird, but works for now, its Remove from finished button
		if (
			(tcp === 'reading' && targetList !== 2) ||
			(tcp === 'wishlist' && targetList !== 1) ||
			(tcp === 'favorites' && targetList !== 4) ||
			(tcp === 'finished' && targetList !== 3 && targetList !== 4) ||
			(tcp === 'finished' && targetList === 3)
		) {
			document.getElementById(`bookSummaryTransitioner${book_id}`)?.classList.add('fadeout')
		}
	}

	async function RemoveBookFromXButtonAct() {
		fadeout()
		setIsLoading(true)
		const newArr: Books = RemoveBookFromX(book_id)
		setUserMyBooks(newArr)
		await MyBooksUpdate()
	}

	async function MyBooksUpdate() {
		await updateMyBooksDb()
		setIsLoading(false)
	}

	if (icon && targetList === 4) return <span className="icon-heart active" onClick={RemoveBookFromXButtonAct}></span>

	return (
		<div className="mark">
			<button className="btn-text" onClick={RemoveBookFromXButtonAct} disabled={isLoading}>
				<span className="icon icon-remove"></span>Remove from {getListName(targetList)}
			</button>
		</div>
	)
}
export default RemoveBookFromXButton
