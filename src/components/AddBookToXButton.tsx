import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksAdd, MyBooksUpdate } from '../helpers/MyBooksHelpers'
import getListName from '../hooks/getListName'

const AddBookToX = async (book: Book, targetList: BookList) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === undefined) myBooks = []
	else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	let bookIsSaved = false
	let returnval: string
	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === book.id) {
			bookIsSaved = true
			myBooks[i].list = targetList
		}
	}
	if (bookIsSaved === false) {
		await MyBooksAdd(
			book,
			targetList,
		)
	} else {
		await MyBooksUpdate(JSON.stringify(myBooks)) // update localstorage, database
	}
	returnval = JSON.stringify(localStorage.getItem('MyBooks'))
	return returnval
}

const AddBookToXButton = (book: Book, targetList: BookList) => {
	const { setUserMyBooks, setPopupNotification, setPopupNotificationShow } = useContext(AppContext)

	function popupNote() {
		setPopupNotification('Added ' + book.title_short + ' to ' + getListName(targetList) + '')
		setPopupNotificationShow(true)
		setTimeout(() => {
			setPopupNotificationShow(false)
		}, 1500)
	}

	async function AddBookToXButtonAct() {
		const refreshState = AddBookToX(book, targetList) // update localstorage, database
		setUserMyBooks(await refreshState) // update global state
	}

	const iconClassName = 'icon icon-'+getListName(targetList)
	// TODO: make icon-wishlist dynamic based on targetList
	return (
		<div className="mark">
			<a onClick={() => { AddBookToXButtonAct(); popupNote() }}>
				<span className={iconClassName}></span>Add to {getListName(targetList)}

			</a>
		</div>
	)
}
export default AddBookToXButton 
