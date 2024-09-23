import { useState } from 'react'
import AddToRemoveFromX from './AddToRemoveFromX'
import BookStartedFinished from './BookStartedFinished'
import ReactMarkdown from 'react-markdown'
import ReviewRating from './ReviewRating'
import ReviewText from './ReviewText'
import ReviewQuote from './ReviewQuote'
import SearchTropes from './SearchTropes'
import convertDate from '../helpers/convertDate'
import { HashLink as Link } from 'react-router-hash-link'
import { cleanAnchor } from '../helpers/cleanInput'
import SummaryReviews from './SummaryReviews'
import BookPages from './BookPages'
import BookSummaryTitle from './BookSummaryTitle'
import BookSummaryCover from './BookSummaryCover'
import useGetSynopsis from '../hooks/useGetSynopsis'

const BookSummary = ({ book, currentPage, refer }: { book: Book; currentPage: Page; refer?: Page }) => {
	const synopsisPages: Page[] = ['search', 'wishlist']
	const pagesMedianPages: Page[] = ['search', 'reading']

	const synopsis = useGetSynopsis(book.id, book.cover_edition_key, synopsisPages, currentPage)
	const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)

	const bookAnchor: string = cleanAnchor(book.title_short + '-' + book.id)
	return (
		<article
			className={book.list && book.list > 0 && currentPage === 'search' ? 'book-summary saved' : 'book-summary'}
			id={bookAnchor}
		>
			<aside className="cover">
				<BookSummaryCover book_cover={book.cover} book_cover_redir={book.cover_redir} />
				{(currentPage === 'finished' || currentPage === 'favorites') && (
					<ReviewRating
						book_id={book.id}
						book_rate_stars={book.rate_stars}
						book_rate_spice={book.rate_spice}
						book_title_short={book.title_short}
					/>
				)}
			</aside>
			<div className="article-main">
				<header style={{ position: 'relative', width: '100%' }}>
					{currentPage !== 'dashboard' && <AddToRemoveFromX book={book} currentPage={currentPage} limit={4} />}
					{currentPage === 'dashboard' && refer !== undefined ? (
						<Link to={`/${refer}`}>
							<BookSummaryTitle
								book_title_short={book.title_short}
								book_first_publish_year={book.first_publish_year}
								currentPage={currentPage}
								book_author_name={book.author_name}
								book_id={book.id}
							/>
						</Link>
					) : (
						<BookSummaryTitle
							book_title_short={book.title_short}
							book_first_publish_year={book.first_publish_year}
							currentPage={currentPage}
							book_author_name={book.author_name}
							book_id={book.id}
						/>
					)}
					{currentPage === 'quotedbooks' && (
						<ReviewQuote book_id={book.id} book_review_fav_quote={book.review_fav_quote} />
					)}
					{pagesMedianPages.includes(currentPage) && (
						<BookPages
							book_id={book.id}
							book_number_of_pages_median={book.number_of_pages_median}
							currentPage={currentPage}
						/>
					)}
				</header>
				<div className="summary-actions">
					<SummaryReviews currentPage={currentPage} book={book} />
					{book.list > 1 && currentPage !== 'search' && currentPage !== 'quotedbooks' && (
						<BookStartedFinished
							date_started={book.date_reading}
							date_finished={book.date_finished}
							book_id={book.id}
							list={book.list}
						/>
					)}
					{currentPage !== 'quotedbooks' && (
						<>
							{currentPage === 'search' && (
								<div className="status" style={{ marginBottom: '.5rem' }}>
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
													{book.date_reading && <> since {convertDate(book.date_reading, 'human')}</>}.
												</>
											)}
											{(book.list === 3 || book.list === 4) && (
												<>
													<Link to={'/finished#' + bookAnchor}>Finished</Link>
													{book.date_finished && <> on {convertDate(book.date_finished, 'human')}</>}
													{book.list === 4 && (
														<>
															&nbsp;and <Link to={'/favorites#' + bookAnchor}>favorited</Link>
														</>
													)}
													.
												</>
											)}
										</em>
									)}
								</div>
							)}
							<AddToRemoveFromX book={book} currentPage={currentPage} limit={0} />
						</>
					)}
				</div>
			</div>
			<footer>
				{(currentPage === 'finished' || currentPage === 'favorites') && (
					<ReviewText book_id={book.id} book_review_text={book.review_text} />
				)}
				{(currentPage === 'finished' || currentPage === 'favorites') && (
					<ReviewQuote book_id={book.id} book_review_fav_quote={book.review_fav_quote} />
				)}
				{currentPage === 'search' && book.subject && <SearchTropes book_id={book.id} tropes={book.subject} />}
				{synopsisPages.includes(currentPage) && synopsis ? (
					// TODO add synopsis to cache
					<>
						<button
							className={isShowingSynopsis ? 'btn-text caret-right-toggle active' : 'btn-text caret-right-toggle'}
							onClick={() => setIsShowingSynopsis(!isShowingSynopsis)}
						>
							Synopsis{' '}
						</button>
						{isShowingSynopsis && (
							<>
								<div className="synopsisWrapper" aria-expanded={isShowingSynopsis}>
									<div className="synopsis">
										<ReactMarkdown>{synopsis}</ReactMarkdown>
									</div>
								</div>
							</>
						)}
					</>
				) : (
					// TODO make link like 'no synopsis yet... write one?' and link to the OL page
					<></>
				)}
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
