import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'

export default function ReadingItems() {
	const { userMyBooks } = useContext(AppContext)
	let hasbook = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	if (typeof booksParsed !== 'object') booksParsed = JSON.parse(booksParsed)
	const booksarr = booksParsed.filter((book) => book.list === 2)
	if (booksarr.length > 0) hasbook = true

	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} key={book.id} />
			})
		}
		return (
			<Link to="/reading">
				<div className="deck-container">
					{booksarr.slice(-6).map((book: Book, index: number) => {
						return (
							<article
								className="book-cover"
								key={book.id}
								style={{ zIndex: 10 - index }}
							>
								<img src={book.coverL} />
							</article>
						)
					})}
				</div>
			</Link>
		)
	}

	return (
		<>
			{hasbook ? (
				<main className="reading deck">{DeckCovers(booksarr)}</main>
			) : (
				<Link to="/reading">
					<main className="toadd">
						<aside>
							<button>
								<img src="img/plus-icon.svg" />
							</button>
						</aside>
						If you're already reading a book, let's add it here.
					</main>
				</Link>
			)}
		</>
	)
}
