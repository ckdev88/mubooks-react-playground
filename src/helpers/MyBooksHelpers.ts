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
		cover_redir: book.cover_redir,
		cover_edition_key: book.cover_edition_key,
		list: list,
		first_publish_year: book.first_publish_year,
		id: book.id,
		img: book.img,
		number_of_pages_median: book.number_of_pages_median,
		rate_stars: 0,
		rate_spice: 0,
		title: book.title,
		title_short: book.title_short,
		review_tropes: [],
		review_text: '',
		review_fav_quote: '',
	})

	MyBooksUpdate(myBooks)
	return myBooks
}

const MyBooksInsertFirst = async (): Promise<void> => {
	const { userid } = useContext(AppContext)
	const { error } = await supabase
		.from('user_entries')
		.insert([{ json: '[]', user_id: userid }])
		.select()
	if (error) console.log(error.message)
	return
}

const MyBooksUpdate = async (myBooksNew: Books): Promise<void> => {
	const { setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)
	let msg: string
	setUserMyBooks(myBooksNew)

	const { error } = await supabase.from('user_entries').update({ json: myBooksNew }).eq('user_id', userid).select()
	if (error) {
		msg = 'Error, data was not changed'
		console.log('error:', error)
	} else msg = 'Updated Mu Books.'

	setPopupNotification(msg)
}

export { MyBooksAdd, MyBooksUpdate, MyBooksInsertFirst }
