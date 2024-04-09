import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'

// TODO: this could just be a toggle with addtoreading... its basically the same code
// TODO: should also be a button, which is actually more important: done reading
const RemoveBookFromFavorites = (id: number) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === id) myBooks[i].favorite = !myBooks[i].favorite
	}
	const myBooksNew: string = JSON.stringify(myBooks)

	UpdateMyBooks(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const RemoveFromFavoritesButton = (id: number, favorite: boolean) => {
	const { setUserMyBooks } = useContext(AppContext)

	function RemoveFromFavoritesButtonAct() {
		const newArr = RemoveBookFromFavorites(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}

	if (!favorite) return <></>
	return (
		<a onClick={() => RemoveFromFavoritesButtonAct()}>
			<span className="icon icon-remove"></span>Remove from favorites
		</a>
	)
}
export default RemoveFromFavoritesButton
