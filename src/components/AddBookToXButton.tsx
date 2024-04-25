import { useContext } from 'react'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import getListName from '../hooks/getListName'

const AddBookToXButton = (book: Book, targetList: BookList) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, setPopupNotificationShow } = useContext(AppContext)

	function MyBooksAdd(book: Book, list = book.list): void {
		if (book.title.length > 55) {
			book.title_short = book.title.slice(0, 55) + '...'
		} else book.title_short = book.title
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
		MyBooksUpdate(JSON.stringify(myBooks))
	}

	async function MyBooksUpdate(myBooksNew: string) {
		setUserMyBooks(myBooksNew)
		const updater = await supabase.auth.updateUser({
			data: { MyBooks: myBooksNew },
		})
		if (!updater) console.log('Something went wrong, Mu Books are not updated.')
		else console.log('Mu Books updated.')
	}

	function popupNote() {
		setPopupNotification('Added ' + book.title_short + ' to ' + getListName(targetList) + '')
		setPopupNotificationShow(true)
		setTimeout(() => {
			setPopupNotificationShow(false)
		}, 1500)
	}

	function AddBookToX(book: Book, targetList: BookList): void {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = JSON.parse(userMyBooks as string)

		let bookIsSaved = false
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				bookIsSaved = true
				myBooks[i].list = targetList
			}
		}
		if (bookIsSaved === false) {
			MyBooksAdd(book, targetList)
		} else {
			MyBooksUpdate(JSON.stringify(myBooks))
		}
	}

	const iconClassName = 'icon icon-' + getListName(targetList)
	return (
		<div className="mark">
			<button
				className="btn-text"
				onClick={() => {
					AddBookToX(book, targetList)
					popupNote()
				}}
			>
				<span className={iconClassName}></span>Add to {getListName(targetList)}
			</button>
		</div>
	)
}
export default AddBookToXButton
