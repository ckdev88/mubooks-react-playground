import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksAdd, MyBooksUpdate } from '../helpers/MyBooksHelpers'

const AddToReading = async (book: Book) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	// check if already saved in localstorage, database. if not, add first
	let bookIsSaved = false
	let returnval: string
	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === book.id) {
			bookIsSaved = true
			myBooks[i].wishlist = false
			myBooks[i].reading = true
			myBooks[i].finished = false
			myBooks[i].favorite = false
		}
	}
	if (bookIsSaved === false) {
		await MyBooksAdd(
			book,
			false,
			true,
			false,
			false
		) // wishlist false, reading true, finished false, favorite false
	} else {
		await MyBooksUpdate(JSON.stringify(myBooks)) // update localstorage, database
	}
	returnval = JSON.stringify(localStorage.getItem('MyBooks'))
	return returnval
}

const AddToReadingButton = (book: Book) => {
	const { setUserMyBooks } = useContext(AppContext)

	async function AddToReadingButtonAct() {
		const refreshState = AddToReading(book) // update localstorage, database
		setUserMyBooks(await refreshState) // update global state
	}

	if (book?.reading || book?.favorite || book?.finished) return <></>
	return (
		<div className="mark">
			<a onClick={() => AddToReadingButtonAct()}>
				<span className="icon icon-reading"></span>Mark as Reading now
			</a>
		</div>
	)
}
export default AddToReadingButton
