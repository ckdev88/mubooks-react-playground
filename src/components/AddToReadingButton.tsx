import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'
import AddBookToSaved from '../stores/AddBookToSaved'

const AddToReading = async (book: Book) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	// check if already saved in localstorage, database. if not, add first
	let bookIsSaved = false
	let returnval: string
	for (let i = 0; i < myBooks.length; i++) {
		// TODO: refactor/combine together with other AddTo***Button.tsx files using args
		if (myBooks[i].id === book.id) {
			bookIsSaved = true
			myBooks[i].wishlist = false
			myBooks[i].reading = true
			myBooks[i].favorite = false
			myBooks[i].finished = false
		}
	}
	if (bookIsSaved === false) {
		// add book to saved, mark as wishlist (+toggle?)
		await AddBookToSaved(book, false, true) // wishlist false, reading true
	} else {
		await UpdateMyBooks(JSON.stringify(myBooks)) // update localstorage, database
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
