import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'
import getListName from '../hooks/getListName'

const RemoveBookFromX = (book: Book) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === undefined) myBooks = []
	else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	if (book.list === 4) {
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				myBooks[i].list = 3
				break
			}
		}
	}
	else {
		let removeIndex = 0
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				removeIndex = i
				break
			}
		}
		myBooks.splice(removeIndex, 1)
	}

	const myBooksNew: string = JSON.stringify(myBooks)

	MyBooksUpdate(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const RemoveBookFromXButton = (book: Book, targetList: BookList) => {
	const { setUserMyBooks, setPopupNotification, setPopupNotificationShow } = useContext(AppContext)

	function popupNote() {
		setPopupNotification('Removed ' + book.title_short + ' from ' + getListName(targetList) + '')
		setPopupNotificationShow(true)
		setTimeout(() => {
			setPopupNotificationShow(false)
		}, 1500)
	}

	function RemoveBookFromXButtonAct() {
		const newArr = RemoveBookFromX(book) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}

	// TODO: use favorite-star instead of icon-remove on different spot
	return (
		<div className="mark">
			<a onClick={() => { RemoveBookFromXButtonAct(); popupNote() }}>
				<span className="icon icon-remove"></span>Remove from {getListName(targetList)}
			</a>
		</div>
	)
}
export default RemoveBookFromXButton
