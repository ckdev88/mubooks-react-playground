import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'

// TODO: add deck of "cards" to show first n of saved books (covers)

const SavedItems = () => {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	if (typeof (booksParsed) !== 'object') booksParsed = JSON.parse(booksParsed)
	const booksarr = booksParsed
	if (booksarr.length > 0) hasbooks = true
	function DeckCovers(booksarr: Books) {
		return booksarr.slice(-6).map((book: Book, index: number) => {
			var img = 'https://images.isbndb.com/covers' + book.img + '.jpg'
			return (
				<article className='book-cover' key={index} style={{ zIndex: 10 - index }}><img src={img} /></article>
			)
		})
	}

	const navigate = useNavigate()
	function goSavedBooks() {
		navigate('/saved-books')
	}

	return (
		<>
			{hasbooks ? (
				<main className='saved deck'>
					<div className='deck-container'>{DeckCovers(booksarr)}</div>
				</main>
			) : (
				<main className="toadd">
					<aside>
						<button onClick={() => goSavedBooks()}>
							<img src="img/save-books-icon.png" />
						</button>
					</aside>
					Let's start saving books.
				</main>
			)}
		</>
	)
}
export default SavedItems
