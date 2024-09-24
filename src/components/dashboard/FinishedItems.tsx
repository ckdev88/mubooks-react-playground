import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'
import BookSummaryCover from '../BookSummaryCover'

export default function FinishedItems({ page }: { page: Page }) {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	const booksarr = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
	if (booksarr.length > 0) hasbooks = true

	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} currentPage={page} key={book.id} refer="finished" />
			})
		}
		booksarr.sort((a, b) => Number(b.date_finished) - Number(a.date_finished))

		let containerClasses: string = 'deck-container'
		if (booksarr.length < 4) containerClasses += ' spread shadeSub'
		else {
			containerClasses += ' stack'
			if (booksarr.length > 5) containerClasses += ' shade'
		}

		// TODO make link to more dynamic towards specific book in case of spread (maybe also when stack)
		return (
			<Link to="/finished">
				<div className={containerClasses}>
					{booksarr.slice(0, 6).map((book: Book, index: number) => {
						let marginLeft: number = 0
						if (index > 0 && booksarr.length > 3) marginLeft = -20.01
						const marginLeftStyle: string = `${marginLeft}%`
						let extraArticleClass: string = ''
						if (booksarr.length > 3) extraArticleClass += ' fl'
						if (booksarr.length < 6) extraArticleClass += ' shade'
						const articleClassNames = `book-cover${extraArticleClass}`

						return (
							<article
								className={articleClassNames}
								key={`deck_finished_books${book.id}`}
								style={{ zIndex: 10 - index, marginLeft: marginLeftStyle }}
							>
								<BookSummaryCover book_cover={book.cover} book_cover_redir={book.cover_redir} />
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
				<main className="finished">{DeckCovers(booksarr)}</main>
			) : (
				<Link to="/finished">
					<main className="toadd">
						<aside>
							<button className="btn-icon">
								<img src="img/icon-finished.png" />
							</button>
						</aside>
						Books I finished reading.
					</main>
				</Link>
			)}
		</>
	)
}
