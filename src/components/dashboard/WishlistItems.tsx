import { useContext } from 'react'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

export default function WishlistItems() {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	if (typeof booksParsed !== 'object') booksParsed = JSON.parse(booksParsed)
	const booksarr = booksParsed.filter((book: Book) => book.wishlist === true)
	if (booksarr.length > 0) hasbooks = true
	function DeckCovers(booksarr: Books) {
		return booksarr.slice(-6).map((book: Book, index: number) => {
			var img = 'https://images.isbndb.com/covers' + book.img + '.jpg'
			return (
				<article className="book-cover" key={book.id} style={{ zIndex: 10 - index }}>
					<img src={img} />
				</article>
			)
		})
	}

	return (
		<>
			{hasbooks ? (
				<main className="wishlist deck">
					<Link to="/wishlist">
						<div className="deck-container">{DeckCovers(booksarr)}</div>
					</Link>
				</main>
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
