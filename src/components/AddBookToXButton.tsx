import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import getListName from '../functions/getListName'
import { convertDate, timestampConverter } from '../helpers/convertDate'
import { useContext } from 'react'

const AddBookToXButton = (book: Book, targetList: BookList, icon: boolean = false) => {
	const { userid, userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)

	function MyBooksAdd(book: Book, list = book.list): Books {
		if (book.title.length > 55) book.title_short = book.title.slice(0, 55) + '...'
		else book.title_short = book.title
		let myBooks = userMyBooks

		const date_now = Number(convertDate(Date.now(), 'digit'))
		let date_reading: number = 0
		if (targetList > 1) date_reading = date_now
		let date_finished: number = 0
		if (targetList > 2) date_finished = date_now
		if (myBooks === null) myBooks = []

		myBooks.push({
			author_key: book.author_key,
			author_name: book.author_name,
			cover: book.cover,
			cover_edition_key: book.cover_edition_key,
			date_finished: date_finished,
			date_reading: date_reading,
			first_publish_year: book.first_publish_year,
			id: book.id,
			img: book.img,
			list: list,
			number_of_pages_median: book.number_of_pages_median,
			rate_spice: 0,
			rate_stars: 0,
			review_fav_quote: '',
			review_text: '',
			review_tropes: [],
			title: book.title,
			title_short: book.title_short,
		})
		return myBooks
	}

	// TODO: move this function to generic helper location
	async function MyBooksUpdate(myBooksNew: Books) {
		let msg: string
		setUserMyBooks(myBooksNew)
		const { error } = await supabase
			.from('user_entries')
			.update({ json: myBooksNew, testdata: 'updated from AddBookToXButton' })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Added ' + book.title_short + ' to ' + getListName(targetList)
		setPopupNotification(msg)
	}

	function AddBookToX(book: Book, targetList: BookList) {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = userMyBooks

		let bookIsSaved = false
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				bookIsSaved = true
				myBooks[i].list = targetList
				if (targetList === 2) myBooks[i].date_reading = Number(timestampConverter(Date.now(), 'digit'))
				if (targetList === 3) myBooks[i].date_finished = Number(timestampConverter(Date.now(), 'digit'))
			}
		}

		let myBooksNew: Books
		if (bookIsSaved === false) myBooksNew = MyBooksAdd(book, targetList)
		else myBooksNew = myBooks
		MyBooksUpdate(myBooksNew)
		return myBooksNew
	}

	function AddBookToXButtonAct() {
		const newArr: Books = AddBookToX(book, targetList)
		setUserMyBooks(newArr)
	}

	const iconClassName = 'icon icon-' + getListName(targetList)

	if (icon && targetList === 4) return <span className="icon-heart inactive" onClick={AddBookToXButtonAct}></span>

	return (
		<div className="mark">
			<button className="btn-text" onClick={AddBookToXButtonAct}>
				<span className={iconClassName}></span>Add to {getListName(targetList)}
			</button>
		</div>
	)
}
export default AddBookToXButton
