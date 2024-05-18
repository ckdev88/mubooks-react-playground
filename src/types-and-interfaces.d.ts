interface AppContextType {
	username: string
	setUsername(username: string): void
	usermail: string
	setUsermail(usermail: string): void
	userid: string
	setUserid(userid: string): void
	userMyBooks: Books
	setUserMyBooks(userMyBooks: []): void
	userIsLoggedIn: boolean
	setUserIsLoggedIn(userIsLoggedIn: boolean): void
	popupNotification: string
	setPopupNotification(popupNotification: string): void
	popupNotificationShow: boolean
	setPopupNotificationShow(popupNotificationShow: boolean): void
}

type User = {
	email: string
	password: string
	screenname?: string
	MyBooks?: string
}

/**
 * On which list the book is or should be.
 * 0: No list, about to be removed
 * 1: Wishlist -- Reading,  finished, favorite = false
 * 2: Reading  -- Wishlist, finished, favorite = false
 * 3: Finished -- Wishlist & reading = false, favorite ambiguous
 * 4: Favorite -- Wishlist & reading = false, finished true
 */
type BookList = 0 | 1 | 2 | 3 | 4

type CoverSize = undefined | 'S' | 'M' | 'L'
type Scale5 = 0 | 1 | 2 | 3 | 4 | 5

interface LoginFormInput {
	login_email: { value: string }
	login_password: { value: string }
}
type BookData = [
	{
		id: Id
		isbn0: string
		isbn1: string
		index?: number
		title: string
		author_name: [string]
		number_of_pages_median: number
		first_publish_year: number
		cover_edition_key: string
		cover: string
		img?: string
		title_short?: string
	},
]
interface Book {
	author_key?: [string]
	author_name: [string]
	cover: string
	cover_edition_key: string
	edition_key?: [string]
	first_publish_year: string
	id: Id
	img?: string
	index?: number
	isbn0: string
	isbn1: string
	isbn?: [string]
	key?: [string]
	/** 1: Wishlist | 2: Reading | 3: Finished | 4: Favorite (+Finished) */
	list: BookList
	number_of_pages_median: number
	title: string
	title_short: string
	date_reading?: number
	date_finished?: number
	rate_stars?: Scale5
	rate_spice?: Scale5
	fav_quote?: string
}

type Results = [Book]
interface Books extends Array<Book> {}

interface BookObject {
	book: Book
}
interface BooksObject {
	books: Books
}
interface IdObject {
	id: Id
}
type Id = string
