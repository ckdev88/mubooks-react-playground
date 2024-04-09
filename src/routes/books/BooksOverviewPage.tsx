import BookSummary from '../../components/BookSummary'
const BooksOverviewPage = ({ books, page }: { books: Books, page: string }) => {
	let savedArr: Books
	if (page === 'savedbookspage' || page === 'wishlistpage' || page === 'readingpage' || page === 'favoritespage') savedArr = books // TODO: actually might be better to turn
	// conditionals around, since saved books (reading/finished/wishlist) will always be saved,
	// whereas search results are mostly not
	else savedArr = JSON.parse(localStorage.getItem('MyBooks') as string)

	// coming from raw data, crosscheck per book with state/localstorage saved/wishlist

	return books.map((book) => {
		if (page !== 'savedbookspage') { // TODO: see comment above

			const savedbookCheck = savedArr.filter(savedbook => savedbook.id === book.id)
			if (savedbookCheck.length > 0) book.saved = true
			else book.saved = false

			const wishlistCheck = savedArr.filter(stateBook => stateBook.id === book.id && stateBook.wishlist === true)
			if (wishlistCheck.length > 0) book.wishlist = true
			else book.wishlist = false
			if (page === 'wishlistpage' && book.wishlist === false) return

			const readingCheck = savedArr.filter(stateBook => stateBook.id === book.id && stateBook.reading === true)
			if (readingCheck.length > 0) book.reading = true
			else book.reading = false
			if (page === 'readingpage' && book.reading === false) return

			const favoriteCheck = savedArr.filter(stateBook => stateBook.id === book.id && stateBook.favorite === true)
			if (favoriteCheck.length > 0) book.favorite = true
			else book.favorite = false
			if (page === 'favoritespage' && book.favorite === false) return

		}
		return <BookSummary book={book} key={book.id} />
	})
}
export default BooksOverviewPage
