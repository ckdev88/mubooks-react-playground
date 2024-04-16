import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'

const RemoveBookFromSaved = (id: Id) => {
	let myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)
	myBooks = myBooks.filter((presentbook: Book) => presentbook.id !== id)
	const myBooksNew: string = JSON.stringify(myBooks)
	UpdateMyBooks(myBooksNew) // update localstorage, database, state with saved booklist
	return myBooksNew
}

const RemoveBookButton = (id: Id, saved: boolean) => {
	const { setUserMyBooks } = useContext(AppContext)
	function RemoveBookButtonAct() {
		const newArr = RemoveBookFromSaved(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}
	if (!saved) return <></>
	return (
		<div className="mark">
			<a onClick={() => RemoveBookButtonAct()}>
				<span className="icon icon-remove"></span>Remove from saved books
			</a>
		</div>
	)
}
export default RemoveBookButton
