import { useContext } from 'react'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import getListName from '../functions/getListName'

const AddBookToXButton = (book: Book, targetList: BookList) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)

	function MyBooksAdd(book: Book, list = book.list): string {
		if (book.title.length > 55) book.title_short = book.title.slice(0, 55) + '...'
		else book.title_short = book.title
		let myBooks = JSON.parse(userMyBooks as string)

		if (myBooks === null) myBooks = []
		myBooks.push({
			author_key: book.author_key,
			author_name: book.author_name,
			cover: book.cover,
			cover_edition_key: book.cover_edition_key,
			list: list,
			first_publish_year: book.first_publish_year,
			id: book.id,
			img: book.img,
			number_of_pages_median: book.number_of_pages_median,
			title: book.title,
			title_short: book.title_short,
		})
		return JSON.stringify(myBooks)
	}

	async function MyBooksUpdate(myBooksNew: string) {
		let msg: string
		setUserMyBooks(myBooksNew)
		await supabase.auth
			.updateUser({
				data: { MyBooks: myBooksNew },
			})
			.then(() => {
				msg = 'Added ' + book.title_short + ' to ' + getListName(targetList)
			})
			.catch(() => {
				msg = 'Something went wrong, Mu Books are not updated.'
			})
			.finally(() => setPopupNotification(msg))
	}

	function AddBookToX(book: Book, targetList: BookList) {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = JSON.parse(userMyBooks as string)

		let bookIsSaved = false
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				bookIsSaved = true
				myBooks[i].list = targetList
				if(targetList===2)myBooks[i].date_reading = Date.now()
				if(targetList===3)myBooks[i].date_finished = Date.now()
			}
		}

		let myBooksNew: string
		if (bookIsSaved === false) myBooksNew = MyBooksAdd(book, targetList)
		else myBooksNew = JSON.stringify(myBooks)
		MyBooksUpdate(myBooksNew)
		return myBooksNew
	}

	function AddBookToXButtonAct() {
		const newArr: string = AddBookToX(book, targetList)
		setUserMyBooks(newArr)
	}

	const iconClassName = 'icon icon-' + getListName(targetList)
	return (
		<div className="mark">
			<button className="btn-text" onClick={AddBookToXButtonAct}>
				<span className={iconClassName}></span>Add to {getListName(targetList)}
			</button>
		</div>
	)
}
export default AddBookToXButton
