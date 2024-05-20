import { useContext } from 'react'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import getListName from '../functions/getListName'
import convertDate from '../helpers/convertDate'

const AddBookToXButton = (book: Book, targetList: BookList) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)

	function MyBooksAdd(book: Book, list = book.list): Books {
		if (book.title.length > 55) book.title_short = book.title.slice(0, 55) + '...'
		else book.title_short = book.title
		let myBooks = userMyBooks

const date_now = Number(convertDate(Date.now(),'digit'))
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
			date_reading: date_reading,
			date_finished: date_finished,
			list: list,
			first_publish_year: book.first_publish_year,
			id: book.id,
			img: book.img,
			number_of_pages_median: book.number_of_pages_median,
			title: book.title,
			title_short: book.title_short,
			rate_stars: 0,
			rate_spice: 0,
		})
		return myBooks
	}

	// TODO: move this function to generic helper location
	async function MyBooksUpdate(myBooksNew: Books) {
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

	// TODO: move this function to generic helper location
	function timestampConverter(UNIX_timestamp: number, outputFormat: 'human' | 'input' | 'digit'): string {
		if (UNIX_timestamp !== undefined) {
			const a = new Date(UNIX_timestamp)
			const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			const year = a.getFullYear()
			const monthNum = a.getMonth() + 1
			const month = months[monthNum]
			const dateNum = a.getDate()
			let datePadded: string | number = dateNum
			let monthPadded: string | number = monthNum
			if (datePadded < 9) datePadded = '0' + dateNum.toString()
			if (monthPadded < 9) monthPadded = '0' + monthNum.toString()
			switch (outputFormat) {
				case 'input':
					return year + '-' + monthPadded + '-' + datePadded
				case 'human':
					return dateNum + ' ' + month + ' ' + year
				case 'digit':
					return year + '' + monthPadded + '' + datePadded
			}
		}
		return ''
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
	return (
		<div className="mark">
			<button className="btn-text" onClick={AddBookToXButtonAct}>
				<span className={iconClassName}></span>Add to {getListName(targetList)}
			</button>
		</div>
	)
}
export default AddBookToXButton
