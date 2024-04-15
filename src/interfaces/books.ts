interface AppContextType {
	username: string
	setUsername(username: string): void
	usermail: string
	setUsermail(usermail: string): void
	userMyBooks: string
	setUserMyBooks(userMyBooks: string): void
	userIsLoggedIn: boolean
	setUserIsLoggedIn(userIsLoggedIn: boolean): void
}
type User = {
	email: string
	password: string
	screenname?: string
	MyBooks?: string
}
interface LoginFormInput {
	loginemail: { value: string }
	loginpassword: { value: string }
}
type BookData = [
	{
		id?: number
		index?: number
		title: string
		author_name: [string]
		number_of_pages_median: number
		first_publish_year: number
		img?: string
		title_short?: string
		cover?: string
	},
]
interface Book {
	index?: number
	id: number
	author_name: [string]
	cover?: string
	first_publish_year: string
	img?: string
	number_of_pages_median: number
	saved?: boolean
	wishlist?: boolean
	reading?: boolean
	finished?: boolean
	favorite?: boolean
	title: string
	title_short: string
}
type Results = [Book]
interface Books extends Array<Book> { }

interface BookObject {
	book: Book
}
interface BooksObject {
	books: Books
}
interface IdObject {
	id: number
}
interface SavedObject {
	saved: boolean
}

interface SearchResult {
	title: string,
	first_publish_year: number,
	isbn: [],
	author_name: [string]
}
interface SearchResults extends Array<SearchResult> { }
