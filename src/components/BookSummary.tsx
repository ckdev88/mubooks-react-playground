import { useState } from 'react'
import AddToRemoveFromX from './AddToRemoveFromX'
import BookStartedFinished from './BookStartedFinished'
import ReactMarkdown from 'react-markdown'
import SearchTropes from './SearchTropes'
import { HashLink as Link } from 'react-router-hash-link'
import { cleanAnchor } from '../helpers/cleanInput'
import SummaryReviews from './SummaryReviews'
import BookPages from './BookPages'
import BookSummaryTitle from './BookSummaryTitle'
import useGetSynopsis from '../hooks/useGetSynopsis'
import BookSummaryAside from './BookSummaryAside'
import BookSummaryStatus from './BookSummaryStatus'
import BookSummaryReview from './BookSummaryReview'

const BookSummary = ({ book, currentPage, refer }: { book: Book; currentPage: Page; refer?: Page }) => {
	const synopsisPages: Page[] = ['search', 'wishlist']
	const pagesMedianPages: Page[] = ['search', 'reading', 'finished']
	const pagesReviewQuotes: Page[] = ['finished', 'favorites', 'savedbooks']

	const synopsis = useGetSynopsis(book.id, book.cover_edition_key, synopsisPages, currentPage)
	const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)

	const bookAnchor: string = `${cleanAnchor(book.title_short)}_${book.id}`
	if (currentPage === 'quoted') refer = 'savedbooks#' + bookAnchor

	return (
		<article
			className={
				book.list && book.list > 0 && currentPage === 'search' ? 'book-summary saved' : `book-summary ${currentPage}`
			}
		>
			<div style={{ marginTop: '-4rem', position: 'absolute' }} id={bookAnchor}></div>
			<BookSummaryAside book={book} currentPage={currentPage} />
			<div className="article-main">
				{currentPage !== 'quoted' && (
					<header style={{ position: 'relative', width: '100%' }}>
						{currentPage !== 'dashboard' && <AddToRemoveFromX book={book} limit={4} currentPage={currentPage} />}
						{currentPage === 'dashboard' && refer !== undefined ? (
							<Link to={`/${refer}`}>
								<BookSummaryTitle
									book_title_short={book.title_short}
									book_first_publish_year={book.first_publish_year}
									book_author_name={book.author_name}
									currentPage={currentPage}
									book_id={book.id}
								/>
							</Link>
						) : (
							<BookSummaryTitle
								book_title_short={book.title_short}
								book_first_publish_year={book.first_publish_year}
								book_author_name={book.author_name}
								currentPage={currentPage}
								book_id={book.id}
							/>
						)}
						{pagesMedianPages.includes(currentPage) && (
							<BookPages book_id={book.id} book_number_of_pages_median={book.number_of_pages_median} />
						)}
					</header>
				)}
				{currentPage === 'quoted' ? (
					<div className="quoteblock">
						<BookSummaryReview book_id={book.id} o_key="review_fav_quote" review_text={book.review_fav_quote} />
						<BookSummaryTitle
							book_title_short={book.title_short}
							book_first_publish_year={book.first_publish_year}
							book_author_name={book.author_name}
							book_id={book.id}
							currentPage={currentPage}
							style="quoted"
						/>
					</div>
				) : (
					<div className="summary-actions">
						<SummaryReviews book={book} currentPage={currentPage} />
						{book.list > 1 && currentPage !== 'search' && (
							<BookStartedFinished
								date_started={book.date_reading}
								date_finished={book.date_finished}
								book_id={book.id}
								list={book.list}
							/>
						)}
						<div className={book.list === 1 ? 'pt085' : ''}>
							{currentPage === 'search' && <BookSummaryStatus book={book} bookAnchor={bookAnchor} />}
							<AddToRemoveFromX book={book} limit={0} currentPage={currentPage} />
						</div>
					</div>
				)}
			</div>
			{currentPage !== 'dashboard' && (
				<footer>
					{pagesReviewQuotes.includes(currentPage) && (
						<BookSummaryReview book_id={book.id} o_key="review_fav_quote" review_text={book.review_fav_quote} />
					)}
					{currentPage === 'search' && book.subject && <SearchTropes book_id={book.id} tropes={book.subject} />}
					{synopsisPages.includes(currentPage) && synopsis ? (
						<div className="synopsis" style={{ marginTop: '.75rem' }}>
							<button
								className={isShowingSynopsis ? 'btn-text caret-right-toggle active' : 'btn-text caret-right-toggle'}
								onClick={() => setIsShowingSynopsis(!isShowingSynopsis)}
							>
								Synopsis{' '}
							</button>
							<>
								<div
									className={isShowingSynopsis ? 'mt05 expandable expanded' : 'mt05 expandable collapsed'}
									aria-expanded={isShowingSynopsis}
								>
									<ReactMarkdown>{synopsis}</ReactMarkdown>
								</div>
							</>
						</div>
					) : (
						// TODO make link like 'no synopsis yet... write one?' and link to the OL page
						<></>
					)}
				</footer>
			)}
		</article>
	)
}
export default BookSummary
