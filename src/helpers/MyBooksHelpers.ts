import { supabase } from '../../utils/supabase'

const MyBooksAdd = async (
	book: Book,
	wishlist = book.wishlist,
	reading = book.reading,
	favorite = book.favorite,
	finished = book.finished
) => {
	if (book.title.length > 35) {
		book.title_short = book.title.slice(0, 35) + '...'
	} else book.title_short = book.title
	let myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	if (myBooks === null) myBooks = []
	myBooks.push({
		author_key: book.author_key,
		author_name: book.author_name,
		cover: book.cover,
		coverL: book.coverL,
		coverM: book.coverM,
		coverS: book.coverS,
		cover_edition_key: book.cover_edition_key,
		edition_key: book.edition_key,
		favorite: favorite,
		finished: finished,
		first_publish_year: book.first_publish_year,
		id: book.id,
		img: book.img,
		number_of_pages_median: book.number_of_pages_median,
		reading: reading,
		saved: true,
		title: book.title,
		title_short: book.title_short,
		wishlist: wishlist,
	})

	MyBooksUpdate(JSON.stringify(myBooks))
	return JSON.stringify(myBooks)
}

const MyBooksUpdate = async (myBooksNew: string) => {
	localStorage.setItem('MyBooks', myBooksNew)
	await supabase.auth.updateUser({
		data: { MyBooks: myBooksNew },
	})
}

export { MyBooksAdd, MyBooksUpdate }
