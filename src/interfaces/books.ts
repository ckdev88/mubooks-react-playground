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
		ti: string
		au: [string]
		pg: number
		dp: number
		img?: string
		title_short?: string
		cover?: string
	},
]
interface Book {
	index?: number
	id: number
	au: [string]
	cover?: string
	dp: string
	img?: string
	pg: number
	saved?: boolean
	wishlist?: boolean
	reading?: boolean
	finished?: boolean
	favorite?: boolean
	ti: string
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
