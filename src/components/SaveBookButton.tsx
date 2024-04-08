import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'

const AddBookToSaved = (book: Book) => {
	if (book.title.length > 35) {
		book.title_short = book.title.slice(0, 35) + '...'
	} else book.title_short = book.title
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)
	if (myBooks.filter((presentbook) => presentbook.id === book.id).length > 0) return // keep unique

	myBooks.push({
		id: book.id,
		authors: book.authors,
		cover: book.cover,
		date_published: book.date_published,
		image: book.image,
		language: book.language,
		pages: book.pages,
		saved: true,
		wishlist: book.wishlist,
		title: book.title,
		title_short: book.title_short,
	})

	const myBooksNew: string = JSON.stringify(myBooks)
	UpdateMyBooks(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const SaveBookButton = (book: Book) => {
	const { setUserMyBooks } = useContext(AppContext)

	function SaveBookButtonAct() {
		const newArr = AddBookToSaved(book) // update localstorage, database
		if (newArr) setUserMyBooks(newArr) // update global state
	}
	if (book?.saved) return <></>
	return (
		<a onClick={() => SaveBookButtonAct()}>
			<span className="icon icon-add"></span>Save in my books
		</a>
	)
}
export default SaveBookButton
