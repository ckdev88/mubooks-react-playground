import { useContext } from 'react'
import { AppContext } from '../../App'

export default function FavoritesItems() {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	if (typeof booksParsed !== 'object') booksParsed = JSON.parse(booksParsed)
	const booksarr = booksParsed.filter((book: Book) => book.favorite === true)
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
				<main className="favorites deck">
					<div className="deck-container">{DeckCovers(booksarr)}</div>
				</main>
			) : (
				<main className="toadd">
					<aside>
						<button>
							<img src="img/icon-favorites.png" />
						</button>
					</aside>
					Only the best ones here.
				</main>
			)}
		</>
	)
}
