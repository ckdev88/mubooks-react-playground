import { getBookCover } from '../Helpers'
import { useState } from 'react'
import AddBookToXButton from './AddBookToXButton'
import BookAuthorList from './BookAuthorList'
import BookStartedFinished from './BookStartedFinished'
import ReactMarkdown from 'react-markdown'
import RemoveBookFromXButton from './RemoveBookFromXButton'
import ReviewRating from './ReviewRating'
import ReviewText from './ReviewText'
import ReviewTropes from './ReviewTropes'
import ReviewQuote from './ReviewQuote'
import SearchTropes from './SearchTropes'
import convertDate from '../helpers/convertDate'
import { HashLink as Link } from 'react-router-hash-link'
import { cleanAnchor } from '../helpers/cleanInput'

const BookSummary = ({ book, page }: { book: Book; page: string }) => {
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
					if (synopsis !== undefined) setSynopsis(synopsis)
					else setSynopsis('No synopsis available yet.')
				})
				.catch((err) => {
					setSynopsis('No synopsis available yet.')
					console.log('error', err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	const bookAnchor: string = cleanAnchor(book.title_short + '-' + book.id)

	return (
		<article
			className={book.list && book.list > 0 && page === 'searchpage' ? 'book-summary saved' : 'book-summary'}
			id={bookAnchor}
		>
			<aside className="cover">
				<img
					src={
						getBookCover(book.cover, 'M') !== undefined
							? getBookCover(book.cover, 'M')
							: 'img/coverless.png'
					}
					alt=""
				/>
						{(page === 'finishedpage' || page === 'favoritespage') && ReviewRating(book)}
			</aside>
			<div className="article-main">
				<header>
					<h2>
						{book.title_short} {book.first_publish_year && <sup>({book.first_publish_year})</sup>}
						<sub>{BookAuthorList(book)}</sub>
					</h2>
					{page === 'quotedbookspage' && ReviewQuote(book, book.review_fav_quote)}
					<p className="pt0 mt0">
						{book.number_of_pages_median &&
							page !== 'finishedpage' &&
							page !== 'favoritespage' &&
							page !== 'quotedbookspage' && <>{book.number_of_pages_median} pages</>}
					</p>
				</header>
				<main>
					<div className="reviews">
						{(page === 'finishedpage' || page === 'favoritespage') &&
							book.review_tropes &&
							ReviewTropes(book, book?.review_tropes)}
						{(page === 'finishedpage' || page === 'favoritespage') && ReviewRating(book)}
					</div>
					{book.list > 1 && page !== 'searchpage' && page !== 'quotedbookspage' && (
						<BookStartedFinished
							date_started={book.date_reading}
							date_finished={book.date_finished}
							bookid={book.id}
							list={book.list}
						/>
					)}
					{page !== 'quotedbookspage' && (
						<>
							{page === 'searchpage' && (
								<div className="status">
									{book.list > 0 && (
										<em>
											{book.list === 1 && (
												<>
													Already on my <Link to={'/wishlist#' + bookAnchor}>wishlist</Link>.
												</>
											)}
											{book.list === 2 && (
												<>
													<Link to={'/reading#' + bookAnchor}>Reading</Link>
													{book.date_reading && (
														<> since {convertDate(book.date_reading, 'human')}</>
													)}
													.
												</>
											)}
											{(book.list === 3 || book.list === 4) && (
												<>
													<Link to={'/finished#' + bookAnchor}>Finished</Link>
													{book.date_finished && (
														<> on {convertDate(book.date_finished, 'human')}</>
													)}
													{book.list === 4 && (
														<>
															&nbsp;and{' '}
															<Link to={'/favorites#' + bookAnchor}>favorited</Link>
														</>
													)}
													.
												</>
											)}
										</em>
									)}
								</div>
							)}
							<div className="marks">
								{!book.list && AddBookToXButton(book, 1)}
								{(book.list === 1 || (page === 'searchpage' && (book.list < 2 || !book.list))) &&
									AddBookToXButton(book, 2)}
								{(book.list === 2 || (page === 'searchpage' && book.list !== 3 && book.list !== 4)) &&
									AddBookToXButton(book, 3)}
								{(book.list === 3 || (page === 'searchpage' && book.list !== 4)) &&
									AddBookToXButton(book, 4)}
								{book.list === 1 && RemoveBookFromXButton(book, 1)}
								{book.list === 2 && RemoveBookFromXButton(book, 2)}
								{book.list === 3 && RemoveBookFromXButton(book, 3)}
								{book.list === 4 && RemoveBookFromXButton(book, 4)}
							</div>
						</>
					)}
				</main>
			</div>
			<footer>
				{(page === 'finishedpage' || page === 'favoritespage') && ReviewText(book, book.review_text)}
				{(page === 'finishedpage' || page === 'favoritespage') && ReviewQuote(book, book.review_fav_quote)}
				{page !== 'finishedpage' && page !== 'favoritespage' && page !== 'quotedbookspage' && (
					<>
						{page === 'searchpage' && book.subject && SearchTropes(book.id, book.subject)}
						<button
							className={
								isShowingSynopsis ? 'btn-text caret-right-toggle active' : 'btn-text caret-right-toggle'
							}
							onClick={toggleSynopsis}
						>
							{isLoading && 'Loading...'}
							{!isLoading && !isShowingSynopsis && 'Synopsis'}
							{!isLoading && isShowingSynopsis && <b style={{ color: 'black' }}> Synopsis </b>}
						</button>
						<div className="synopsisWrapper" aria-expanded={isShowingSynopsis}>
							<div className="synopsis">
								<ReactMarkdown>{synopsis}</ReactMarkdown>
							</div>
						</div>
					</>
				)}
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
