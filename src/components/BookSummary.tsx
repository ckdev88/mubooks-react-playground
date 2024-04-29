import AddBookToXButton from './AddBookToXButton'
import RemoveBookFromXButton from './RemoveBookFromXButton'
import BookAuthorList from './BookAuthorList'
import { getBookCover } from '../Helpers'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const BookSummary = ({ book }: BookObject) => {
	const [synopsis, setSynopsis] = useState<string>('')
	const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function toggleSynopsis() {
		if (isShowingSynopsis) setIsShowingSynopsis(!isShowingSynopsis)
		else {
			setIsLoading(true)
			await fetch('https://openlibrary.org/works/' + book.id + '.json')
				.then((res) => res.json())
				.then((json) => json.description?.value)
				.then((synopsis) => {
					setIsShowingSynopsis(true)
					if (synopsis !== undefined) setSynopsis(synopsis + '-----')
					else setSynopsis('No synopsis available yet.')
				})
				.catch((err) => {
					setSynopsis('No synopsis available yet.')
					console.log('error',err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	return (
		// TODO: add className for when marked as saved
		<article className="book-summary">
			<header>
				<aside className="cover">
					<img
						src={
							getBookCover(book.cover, 'M') !== undefined
								? getBookCover(book.cover, 'M')
								: 'img/coverless.png'
						}
						alt=""
					/>
				</aside>
				<div className="in-short">
					<h2>
						{book.title_short} <sup>({book.first_publish_year})</sup>
						<sub>{BookAuthorList(book)}</sub>
					</h2>
					{book.number_of_pages_median && <>{book.number_of_pages_median} pages</>}
					<br />
				</div>
			</header>
			<footer>
				<button
					className={isShowingSynopsis ? 'btn-text caret-toggle active' : 'btn-text caret-toggle'}
					onClick={toggleSynopsis}
				>
					{isLoading ? 'Loading...' : 'Synopsis'}
				</button>
				<div className="synopsis">
					<div className={isShowingSynopsis ? 'dblock' : 'dnone'}>
						<ReactMarkdown>{synopsis}</ReactMarkdown>
					</div>
				</div>
				<div className="marks">
					<div className="mark">
						{/* TODO: build further on new feature; highlight saved books in search view */}
						{!book.list && AddBookToXButton(book, 1)}
						{book.list === 1 && AddBookToXButton(book, 2)}
						{book.list === 2 && AddBookToXButton(book, 3)}
						{book.list === 3 && AddBookToXButton(book, 4)}
						{book.list === 1 && RemoveBookFromXButton(book, 1)}
						{book.list === 2 && RemoveBookFromXButton(book, 2)}
						{book.list === 3 && RemoveBookFromXButton(book, 3)}
						{book.list === 4 && RemoveBookFromXButton(book, 4)}
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
