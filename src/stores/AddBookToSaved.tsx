import UpdateMyBooks from './UpdateMyBooks'

export default async function AddBookToSaved(
	book: Book,
	wishlist = book.wishlist,
	reading = book.reading,
	favorite = book.favorite,
	finished = book.finished
) {
	if (book.title.length > 35) {
		book.title_short = book.title.slice(0, 35) + '...'
	} else book.title_short = book.title
	let myBooks: Books = JSON.parse(localStorage.getItem('MyBooks') as string)

	if (myBooks === null) myBooks = []
	myBooks.push({
		id: book.id,
		author_name: book.author_name,
		cover: book.cover,
		first_publish_year: book.first_publish_year,
		img: book.img,
		number_of_pages_median: book.number_of_pages_median,
		saved: true,
		wishlist: wishlist,
		reading: reading,
		finished: finished,
		favorite: favorite,
		title: book.title,
		title_short: book.title_short,
	})

	UpdateMyBooks(JSON.stringify(myBooks))
	return JSON.stringify(myBooks)
}
