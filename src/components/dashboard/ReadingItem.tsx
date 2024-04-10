import { useContext } from "react"
import { AppContext } from "../../App"
import BookSummary from "../BookSummary"

// let hasbooks = false
// let books = []
//
// if (muBooksStore.getReadingBook !== false) {
// 	books = ref(muBooksStore.getReadingBook)
// 	if (books.value.length > 0) hasbooks = true
// }

/* if hasbooks... 
 *
	<main className="readingnow">
		<article className="book-summary" v-for="(book, index) in books">
			<aside className="cover"><img :src="book.image" /></aside>
			<div className="in-short">
				<h2>{{ book.ti }}</h2>
			</div>
		</article>
	</main>
*/

export default function ReadingItem() {
	let hasbook = false
	const { userMyBooks } = useContext(AppContext)
	let readingBookArr: Books = JSON.parse(userMyBooks)
	if (typeof (readingBookArr) !== 'object') readingBookArr = JSON.parse(readingBookArr)
	readingBookArr = readingBookArr.filter((book) => book.reading === true)
	if (readingBookArr.length > 0) hasbook = true
	function showReadingBooks(readingBookArr: Books) {
		return readingBookArr.map((book: Book) => {
			return <BookSummary book={book} key={book.id} />
		})
	}

	return (
		<>
			{hasbook ? (
				<main>{showReadingBooks(readingBookArr)}</main>
			) : (
				<main className="toadd">
					<aside>
						<button><img src="img/plus-icon.svg" /></button>
					</aside>
					If you're already reading a book, let's add it here.
				</main>
			)}
		</>
	)
}

