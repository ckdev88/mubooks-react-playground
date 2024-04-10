import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'
import AddBookToSaved from '../stores/AddBookToSaved'

const AddToFavorites = async (book: Book) => {
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
			myBooks[i].reading = false
			myBooks[i].favorite = true
			myBooks[i].finished = false
		}
	}
	if (bookIsSaved === false) {
		// add book to saved, mark as wishlist (+toggle?)
		await AddBookToSaved(book, false, false, true) /* wishlist false, reading false, favorite true */
	}
	else {
		await UpdateMyBooks(JSON.stringify(myBooks)) // update localstorage, database
	}
	returnval = JSON.stringify(localStorage.getItem('MyBooks'))
	return returnval
}

const AddToFavoritesButton = (book: Book) => {
	const { setUserMyBooks } = useContext(AppContext)

	async function AddToFavoritesButtonAct() {
		const refreshState = AddToFavorites(book) // update localstorage, database
		setUserMyBooks(await refreshState) // update global state
	}

	if (book?.favorite) return <></>
	return (
		<a onClick={() => AddToFavoritesButtonAct()}>
			<span className="icon icon-favorites"></span>Add to Favorites
		</a>
	)
}
export default AddToFavoritesButton
