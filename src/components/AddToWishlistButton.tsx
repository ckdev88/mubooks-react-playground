import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'
import AddBookToSaved from '../stores/AddBookToSaved'

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
		// add book to saved, mark as wishlist (+toggle?)
		await AddBookToSaved(book, true, false)
	} else {
		await UpdateMyBooks(JSON.stringify(myBooks)) // update localstorage, database
	}
	returnval = JSON.stringify(localStorage.getItem('MyBooks'))
	return returnval
}

const AddToWishlistButton = (book: Book) => {
	const { setUserMyBooks } = useContext(AppContext)

	async function AddToWishlistButtonAct() {
		const refreshState = AddBookToWishlist(book)
		setUserMyBooks(await refreshState) // TODO: running twice needed right now, far from ideal, refactor
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
