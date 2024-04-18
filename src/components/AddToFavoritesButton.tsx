import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksAdd, MyBooksUpdate } from '../helpers/MyBooksHelpers'

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
			myBooks[i].finished = true
			myBooks[i].favorite = true
		}
	}
	if (bookIsSaved === false) {
		await MyBooksAdd(
			book,
			false,
			false,
			true,
			true
		) // wishlist false, reading false, finished true, favorite true
	} else {
		await MyBooksUpdate(JSON.stringify(myBooks)) // update localstorage, database
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
		<div className="mark">
			<a onClick={() => AddToFavoritesButtonAct()}>
				<span className="icon icon-favorites"></span>Add to Favorites
			</a>
		</div>
	)
}
export default AddToFavoritesButton
