import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'

// TODO: this could just be a toggle with addtoreading... its basically the same code
// TODO: should also be a button, which is actually more important: done reading
const RemoveFromReading = (id: Id) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === id) myBooks[i].reading = !myBooks[i].reading
	}
	const myBooksNew: string = JSON.stringify(myBooks)

	MyBooksUpdate(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const RemoveFromReadingButton = (id: Id) => {
	const { setUserMyBooks } = useContext(AppContext)

	function RemoveFromReadingButtonAct() {
		const newArr = RemoveFromReading(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}

	return (
		<a onClick={() => RemoveFromReadingButtonAct()}>
			<span className="icon icon-remove"></span>Remove from reading
		</a>
	)
}
export default RemoveFromReadingButton
