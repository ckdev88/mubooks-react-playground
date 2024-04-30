import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'
import { getBookCover } from '../../Helpers'

export default function SavedItems() {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	const booksarr = booksParsed
	if (booksarr.length > 0) hasbooks = true

	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} key={book.id} />
			})
		}
		return (
			<Link to="/saved-books">
				<div className="deck-container">
					{booksarr.slice(-6).map((book: Book, index: number) => {
						return (
							<article
								className="book-cover"
								key={book.id}
								style={{ zIndex: 10 - index }}
							>
								<img src={getBookCover(book.cover, 'L')} />
							</article>
						)
					})}
				</div>
			</Link>
		)
	}

	return (
		<>
			{hasbooks ? (
				<main className="saved deck">{DeckCovers(booksarr)}</main>
			) : (
				<Link to="/saved">
					<main className="toadd">
						<aside>
							<button className="btn-icon">
								<img src="img/save-books-icon.png" />
							</button>
						</aside>
						Let's start saving books.
					</main>
				</Link>
			)}
		</>
	)
}
