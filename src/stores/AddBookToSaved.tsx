import UpdateMyBooks from "./UpdateMyBooks"

export default async function AddBookToSaved(book: Book, wishlist = book.wishlist, reading = book.reading, favorite = book.favorite, finished = false) {
	if (book.ti.length > 35) {
		book.title_short = book.ti.slice(0, 35) + '...'
	} else book.title_short = book.ti
	let myBooks: Books = JSON.parse(localStorage.getItem('MyBooks') as string)

	if (myBooks === null) myBooks = []
	myBooks.push({
		id: book.id,
		au: book.au,
		cover: book.cover,
		dp: book.dp,
		img: book.img,
		pg: book.pg,
		saved: true,
		wishlist: wishlist,
		reading: reading,
		finished: finished,
		favorite: favorite,
		ti: book.ti,
		title_short: book.title_short,
	})

	UpdateMyBooks(JSON.stringify(myBooks))
	return JSON.stringify(myBooks)
}

