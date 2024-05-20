import { supabase } from '../../utils/supabase'
import { AppContext } from '../App'
import { useContext } from 'react'

const MyBooksAdd = async (book: Book, list = book.list) => {
	const { userMyBooks } = useContext(AppContext)
	if (book.title.length > 55) book.title_short = book.title.slice(0, 55) + '...'
	else book.title_short = book.title
	let myBooks = userMyBooks

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

	MyBooksUpdate(myBooks)
	return myBooks
}

const MyBooksUpdate = async (myBooksNew: string) => {
	await supabase.auth.updateUser({
		data: { MyBooks: myBooksNew },
	})
}

export { MyBooksAdd, MyBooksUpdate }
