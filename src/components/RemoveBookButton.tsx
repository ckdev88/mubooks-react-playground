import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'

const RemoveBookFromSaved = (id: Id) => {
	// TODO: get rid of localStorage reference
	let myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)
	myBooks = myBooks.filter((presentbook: Book) => presentbook.id !== id)
	const myBooksNew: string = JSON.stringify(myBooks)
	MyBooksUpdate(myBooksNew) // update database, state with saved booklist
	return myBooksNew
}

const RemoveBookButton = (id: Id) => {
	const { setUserMyBooks } = useContext(AppContext)
	function RemoveBookButtonAct() {
		const newArr = RemoveBookFromSaved(id) // update database
		setUserMyBooks(newArr) // update global state
	}
	return (
		<div className="mark">
			<button className="btn-text" onClick={() => RemoveBookButtonAct()}>
				<span className="icon icon-remove"></span>Remove from saved books
			</button>
		</div>
	)
}
export default RemoveBookButton
