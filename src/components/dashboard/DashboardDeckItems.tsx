import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'
import { shuffleArray } from '../../Helpers'
import BookSummaryCover from '../BookSummaryCover'
import { cleanAnchor } from '../../helpers/cleanInput'

const DashboardDeckItems = ({ page, noBooksText }: { page: Page; noBooksText: string }) => {
	let book_list: Book['list']
	let btnIconAdd: string = `img/icon-${page}.png`
	if (page === 'reading') {
		book_list = 2
		btnIconAdd = 'img/plus-icon.svg'
	} else if (page === 'wishlist') {
		book_list = 1
	} else if (page === 'favorites') book_list = 4
	else if (page === 'finished') book_list = 3
	else if (page === 'savedbooks') {
		btnIconAdd = 'img/save-books-icon.png'
	}

	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	let booksarr = userMyBooks.filter((book: Book) => book.list === book_list)
	if (page === 'savedbooks') booksarr = userMyBooks
	if (booksarr.length > 0) hasbooks = true

	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} key={book.id} currentPage="dashboard" refer={page} />
			})
		}
		if (page === 'favorites' || page === 'savedbooks') shuffleArray(booksarr as [])
		if (page === 'finished') booksarr.sort((a, b) => Number(b.date_finished) - Number(a.date_finished))

		let slicedArr = booksarr.slice(-6)
		if (page === 'finished') slicedArr = booksarr.slice(0, 6)

		let containerClasses: string = 'deck-container'
		if (booksarr.length < 4) containerClasses += ' spread shadeSub'
		else {
			containerClasses += ' stack'
			if (booksarr.length > 5) containerClasses += ' shade'
		}

		// TODO make link to more dynamic towards specific book in case of spread (maybe also when stack)
		return (
			<div className={containerClasses}>
				{slicedArr.map((book: Book, index: number) => {
					let marginLeft: number = 0
					if (index > 0 && booksarr.length > 3) marginLeft = -20.01
					const marginLeftStyle: string = `${marginLeft}%`
					let extraArticleClass: string = ''
					if (booksarr.length > 3) extraArticleClass += ' fl'
					if (booksarr.length < 6) extraArticleClass += ' shade'
					const articleClassNames = `book-cover${extraArticleClass}`
					const bookAnchor: string = cleanAnchor(book.title_short + '-' + book.id)

					return (
						<article
							className={articleClassNames}
							key={`deck_${page}_books${book.id}`}
							style={{ zIndex: 10 - index, marginLeft: marginLeftStyle }}
						>
							<Link to={'/' + page + '#' + bookAnchor}>
								<BookSummaryCover book_cover={book.cover} book_cover_redir={book.cover_redir} />
							</Link>
						</article>
					)
				})}
			</div>
		)
	}

	return (
		<>
			{hasbooks ? (
				<main className={page}>{DeckCovers(booksarr)}</main>
			) : (
				<Link to={'/' + page}>
					<main className="toadd">
						<aside>
							<button className="btn-icon">
								<img src={btnIconAdd} />
							</button>
						</aside>
						{noBooksText}
					</main>
				</Link>
			)}
		</>
	)
}
export default DashboardDeckItems
