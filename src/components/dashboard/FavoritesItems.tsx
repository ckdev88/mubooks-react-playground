import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'
import { getBookCover } from '../../Helpers'

export default function FavoritesItems() {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	const booksarr = booksParsed.filter((book: Book) => book.list === 4)
	if (booksarr.length > 0) hasbooks = true

	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} key={book.id} />
			})
		}
		return (
			<Link to="/favorites">
				<div className="deck-container">
					{booksarr.slice(-6).map((book: Book, index: number) => {
						return (
							<article className="book-cover" key={book.id} style={{ zIndex: 10 - index }}>
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
				<main className="favorites deck">{DeckCovers(booksarr)}</main>
			) : (
				<Link to="/favorites">
					<main className="toadd">
						<aside>
							<button className="btn-icon">
								<img src="img/icon-favorites.png" />
							</button>
						</aside>
						Only the best ones here.
					</main>
				</Link>
			)}
		</>
	)
}
