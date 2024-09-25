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

const BookSummary = ({ book, currentPage, refer }: { book: Book; currentPage: Page; refer?: Page }) => {
	const synopsisPages: Page[] = ['search', 'wishlist']
	const pagesMedianPages: Page[] = ['search', 'reading']

	const synopsis = useGetSynopsis(book.id, book.cover_edition_key, synopsisPages, currentPage)
	const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)

	const bookAnchor: string = cleanAnchor(book.title_short + '-' + book.id)
	if (currentPage === 'quotedbooks') refer = 'savedbooks#' + bookAnchor

	return (
		<article
			className={book.list && book.list > 0 && currentPage === 'search' ? 'book-summary saved' : 'book-summary'}
			id={bookAnchor}
		>
			<BookSummaryAside book={book} currentPage={currentPage} />
			<div className="article-main">
				<header style={{ position: 'relative', width: '100%' }}>
					{currentPage !== 'dashboard' && <AddToRemoveFromX book={book} currentPage={currentPage} limit={4} />}
					{(currentPage === 'dashboard' || currentPage === 'quotedbooks') && refer !== undefined ? (
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
						<div>
							{currentPage === 'search' && <BookSummaryStatus book={book} bookAnchor={bookAnchor} />}
							<AddToRemoveFromX book={book} currentPage={currentPage} limit={0} />
						</div>
					)}
				</div>
			</div>
			<footer>
				{currentPage === 'search' && book.subject && <SearchTropes book_id={book.id} tropes={book.subject} />}
				{synopsisPages.includes(currentPage) && synopsis ? (
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
