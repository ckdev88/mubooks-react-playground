import { useContext } from 'react'
import { AppContext } from '../../App'


export default function WishlistItems() {
	function DeckCovers(books: string) {
		let booksParsed = JSON.parse(books)
		return (
			booksParsed.slice(0, 6).map((book: Book, index: number) => {
				var img = 'https://images.isbndb.com/covers' + book.img + '.jpg'
				return (
					<article className='book-cover' key={index} style={{ backgroundColor: 'hotpink', zIndex: 10 - index }}>
						<img src={img} />
					</article>)
			})
		)
	}
	const { userMyBooks } = useContext(AppContext)
	let hasbooks = false
	if (userMyBooks.length > 2) hasbooks = true

	return (
		<>
			{
				hasbooks ? (
					<main className='wishlist deck'>
						<div className='deck-container'>
							{DeckCovers(userMyBooks)}</div>
					</main>
				) : (
					<main className="toadd">
						<aside>
							<button>
								<img src="img/icon-wishlist.png" />
							</button>
						</aside>
						Next in line.
					</main>
				)
			}
		</>
	)
}
