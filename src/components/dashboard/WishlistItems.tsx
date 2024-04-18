import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'

export default function WishlistItems() {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	if (typeof booksParsed !== 'object') booksParsed = JSON.parse(booksParsed)
	const booksarr = booksParsed.filter((book: Book) => book.list === 1)
	if (booksarr.length > 0) hasbooks = true
	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} key={book.id} />
			})
		}
		return (
			<Link to="/wishlist">
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
			{hasbooks ? (
				<main className="wishlist deck">{DeckCovers(booksarr)}</main>
			) : (
				<Link to="/wishlist">
					<main className="toadd">
						<aside>
							<button>
								<img src="img/icon-wishlist.png" />
							</button>
						</aside>
						Next in line.
					</main>
				</Link>
			)}
		</>
	)
}
