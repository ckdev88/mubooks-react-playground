import { useContext } from 'react'
import { AppContext } from '../App'
import AddBookToSaved from '../stores/AddBookToSaved'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'

const AddBookToWishlist = async (book: Book) => {
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
			myBooks[i].wishlist = true
			myBooks[i].reading = false
			myBooks[i].favorite = false
			myBooks[i].finished = false
		}
	}
	if (bookIsSaved === false) {
		await AddBookToSaved(
			book,
			true,
			false,
			false,
			false
		) // wishlist true, reading false, finished false, favorite false
	} else {
		await MyBooksUpdate(JSON.stringify(myBooks)) // update localstorage, database
	}
	returnval = JSON.stringify(localStorage.getItem('MyBooks'))
	return returnval
}

const AddToWishlistButton = (book: Book) => {
	const { setUserMyBooks } = useContext(AppContext)

	async function AddToWishlistButtonAct() {
		const refreshState = AddBookToWishlist(book) // update localstorage, database
		setUserMyBooks(await refreshState) // update global state
	}

	if (book?.wishlist || book?.finished || book?.favorite) return <></>
	return (
		<div className="mark">
			<a onClick={() => AddToWishlistButtonAct()}>
				<span className="icon icon-wishlist"></span>Add to wishlist
			</a>
		</div>
	)
}
export default AddToWishlistButton
