import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import getListName from '../functions/getListName'
import { convertDate, timestampConverter } from '../helpers/convertDate'
import { useContext } from 'react'

const AddBookToXButton = ({
	book_id,
	book_list,
	book_title,
	book_title_short,
	book_author_key,
	book_author_name,
	book_cover,
	book_cover_edition_key,
	book_first_publish_year,
	book_img,
	book_number_of_pages_median,
	targetList,
	icon = false,
	button_title = '',
}: {
	book_id: Book['id']
	book_list: Book['list']
	book_title: Book['title']
	book_title_short: Book['title_short']
	book_author_key: Book['author_key']
	book_author_name: Book['author_name']
	book_cover: Book['cover']
	book_cover_edition_key: Book['cover_edition_key']
	book_first_publish_year: Book['first_publish_year']
	book_img: Book['img']
	book_number_of_pages_median: Book['number_of_pages_median']
	targetList: BookList
	icon: boolean
	button_title?: string
}) => {
	const { userid, userMyBooks, setUserMyBooks, setPopupNotification, todaysDateDigit } = useContext(AppContext)

	if (button_title === '') button_title = `Add to ${getListName(targetList)}`
	// TODO: deze wordt vaak geladen in lange lijst, data flow beperken wanneer niet wordt gebruikt?

	const book = {
		id: book_id,
		list: book_list,
		title: book_title,
		title_short: book_title_short,
		author_key: book_author_key,
		author_name: book_author_name,
		cover: book_cover,
		cover_edition_key: book_cover_edition_key,
		first_publish_year: book_first_publish_year,
		img: book_img,
		number_of_pages_median: book_number_of_pages_median,
	}

	function MyBooksAdd(list = book_list): Books {
		if (book_title.length > 55) book_title_short = book_title.slice(0, 55) + '...'
		else book_title_short = book_title
		let myBooks = userMyBooks

		const date_now = Number(convertDate(Date.now(), 'digit'))
		let date_reading: number = 0
		if (targetList > 1) date_reading = date_now
		let date_finished: number = 0
		if (targetList > 2) date_finished = date_now
		if (myBooks === null) myBooks = []

		myBooks.push({
			author_key: book_author_key,
			author_name: book_author_name,
			cover: book_cover,
			cover_edition_key: book_cover_edition_key,
			date_finished: date_finished,
			date_reading: date_reading,
			first_publish_year: book_first_publish_year,
			id: book_id,
			img: book.img,
			list: list,
			number_of_pages_median: book_number_of_pages_median,
			rate_spice: 0,
			rate_stars: 0,
			review_fav_quote: '',
			review_text: '',
			review_tropes: [],
			title: book_title,
			title_short: book_title_short,
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
		else msg = 'Added ' + book_title_short + ' to ' + getListName(targetList)
		setPopupNotification(msg)
	}

	function AddBookToX(targetList: BookList) {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = userMyBooks

		let bookIsSaved = false
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book_id) {
				bookIsSaved = true
				myBooks[i].list = targetList
				if (targetList === 2) myBooks[i].date_reading = todaysDateDigit
				if (targetList === 3) myBooks[i].date_finished = todaysDateDigit
			}
		}

		let myBooksNew: Books
		if (bookIsSaved === false) myBooksNew = MyBooksAdd(targetList)
		else myBooksNew = myBooks
		MyBooksUpdate(myBooksNew)
		return myBooksNew
	}

	function AddBookToXButtonAct() {
		const newArr: Books = AddBookToX(targetList)
		setUserMyBooks(newArr)
	}

	const iconClassName = 'icon icon-' + getListName(targetList)

	if (icon && targetList === 4)
		return <span className="icon-heart inactive" onClick={() => AddBookToXButtonAct()}></span>

	return (
		<div className="mark">
			<button className="btn-text" onClick={() => AddBookToXButtonAct()}>
				<span className={iconClassName}></span>
				{button_title}
			</button>
		</div>
	)
}
export default AddBookToXButton
