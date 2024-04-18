import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'

const AddToFinished = (id: Id) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === id) {
			myBooks[i].wishlist = false
			myBooks[i].reading = false
			myBooks[i].finished = true
			myBooks[i].favorite = false
		}
	}
	const myBooksNew: string = JSON.stringify(myBooks)

	MyBooksUpdate(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const AddToFinishedButton = (id: Id) => {
	const { setUserMyBooks } = useContext(AppContext)

	function AddToFinishedButtonAct() {
		const newArr = AddToFinished(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}

	return (
		<div className='mark'>
			<a onClick={() => AddToFinishedButtonAct()}>
				<span className="icon icon-read"></span>Finish reading
			</a>
		</div>
	)
}
export default AddToFinishedButton 
