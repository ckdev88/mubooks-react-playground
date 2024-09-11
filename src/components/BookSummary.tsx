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
import BookAddPages from './BookAddPages'
import BookModifyPages from './BookModifyPages'

const BookSummary = ({ book, currentPage }: { book: Book; currentPage: Page }) => {
	const [synopsis, setSynopsis] = useState<string>('')
	const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [showHiddenMarks, setShowHiddenMarks] = useState<boolean>(false)

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
			className={book.list && book.list > 0 && currentPage === 'search' ? 'book-summary saved' : 'book-summary'}
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
				{(currentPage === 'finished' || currentPage === 'favorites') && ReviewRating(book)}
			</aside>
			<div className="article-main">
				<header style={{ position: 'relative', width: '100%' }}>
					{currentPage !== 'search' ? (
						book.list === 4 ? (
							<RemoveBookFromXButton
								book_id={book.id}
								book_title_short={book.title_short}
								book_list={book.list}
								targetList={book.list}
								icon={true}
							/>
						) : (
							book.list === 3 && (
								<AddBookToXButton
									book_id={book.id}
									book_list={book.list}
									book_title={book.title}
									book_title_short={book.title_short}
									book_author_key={book.author_key}
									book_author_name={book.author_name}
									book_cover={book.cover}
									book_cover_edition_key={book.cover_edition_key}
									book_first_publish_year={book.first_publish_year}
									book_img={book.img}
									book_number_of_pages_median={book.number_of_pages_median}
									targetList={4}
									icon={true}
								/>
							)
						)
					) : (
						''
					)}
					<h2>
						{book.title_short}{' '}
						{book.first_publish_year && currentPage === 'search' && <sup>({book.first_publish_year})</sup>}
						<sub>{BookAuthorList(book)}</sub>
					</h2>

					{currentPage === 'quotedbooks' && ReviewQuote(book, book.review_fav_quote)}
					{currentPage !== 'finished' && currentPage !== 'favorites' && currentPage !== 'quotedbooks' && (
						<div className="pt0 mt0">
							<div
								className={
									!book.number_of_pages_median && currentPage !== 'search' ? 'diblock' : 'dnone'
								}
							>
								{BookAddPages(book)}
							</div>
							<span className={book.number_of_pages_median === 0 ? 'dnone' : 'diblock'}>
								{book.number_of_pages_median} pages
							</span>
							{currentPage !== 'dashboard' && currentPage !== 'wishlist' && <> {BookModifyPages(book)}</>}
						</div>
					)}
				</header>
				<div className="summary-actions">
					<div className="reviews">
						{(currentPage === 'finished' || currentPage === 'favorites') &&
							book.review_tropes &&
							ReviewTropes(book, book?.review_tropes)}
					</div>
					{book.list > 1 && currentPage !== 'search' && currentPage !== 'quotedbooks' && (
						<BookStartedFinished
							date_started={book.date_reading}
							date_finished={book.date_finished}
							bookid={book.id}
							list={book.list}
						/>
					)}
					{currentPage !== 'quotedbooks' && (
						<>
							{currentPage === 'search' && (
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
							{currentPage !== 'reading' && currentPage !== 'dashboard' && (
								<button className="btn-icon" onClick={() => setShowHiddenMarks(!showHiddenMarks)}>
									<span className="icon icon-dots"></span>
								</button>
							)}
							<div
								className={
									showHiddenMarks || currentPage === 'reading' ? 'marks dblock' : 'marks dnone'
								}
							>
								{!book.list && (
									<AddBookToXButton
										book_id={book.id}
										book_list={book.list}
										book_title={book.title}
										book_title_short={book.title_short}
										book_author_key={book.author_key}
										book_author_name={book.author_name}
										book_cover={book.cover}
										book_cover_edition_key={book.cover_edition_key}
										book_first_publish_year={book.first_publish_year}
										book_img={book.img}
										book_number_of_pages_median={book.number_of_pages_median}
										targetList={1}
										icon={true}
									/>
								)}
								{(book.list === 1 || (currentPage === 'search' && (book.list < 2 || !book.list))) && (
									<AddBookToXButton
										book_id={book.id}
										book_list={book.list}
										book_title={book.title}
										book_title_short={book.title_short}
										book_author_key={book.author_key}
										book_author_name={book.author_name}
										book_cover={book.cover}
										book_cover_edition_key={book.cover_edition_key}
										book_first_publish_year={book.first_publish_year}
										book_img={book.img}
										book_number_of_pages_median={book.number_of_pages_median}
										targetList={2}
										icon={true}
									/>
								)}
								{(book.list === 2 ||
									(currentPage === 'search' && book.list !== 3 && book.list !== 4)) && (
									<AddBookToXButton
										book_id={book.id}
										book_list={book.list}
										book_title={book.title}
										book_title_short={book.title_short}
										book_author_key={book.author_key}
										book_author_name={book.author_name}
										book_cover={book.cover}
										book_cover_edition_key={book.cover_edition_key}
										book_first_publish_year={book.first_publish_year}
										book_img={book.img}
										book_number_of_pages_median={book.number_of_pages_median}
										targetList={3}
										icon={true}
									/>
								)}
								{(book.list === 3 || (currentPage === 'search' && book.list !== 4)) && (
									<AddBookToXButton
										book_id={book.id}
										book_list={book.list}
										book_title={book.title}
										book_title_short={book.title_short}
										book_author_key={book.author_key}
										book_author_name={book.author_name}
										book_cover={book.cover}
										book_cover_edition_key={book.cover_edition_key}
										book_first_publish_year={book.first_publish_year}
										book_img={book.img}
										book_number_of_pages_median={book.number_of_pages_median}
										targetList={4}
										icon={true}
									/>
								)}
								{book.list === 1 && (
									<RemoveBookFromXButton
										book_id={book.id}
										book_list={book.list}
										book_title_short={book.title_short}
										targetList={1}
										icon={true}
									/>
								)}
								{book.list === 2 && (
									<RemoveBookFromXButton
										book_id={book.id}
										book_list={book.list}
										book_title_short={book.title_short}
										targetList={book.list}
										icon={true}
									/>
								)}
								{(book.list === 3 || book.list === 4) && (
									<RemoveBookFromXButton
										book_id={book.id}
										book_list={book.list}
										book_title_short={book.title_short}
										targetList={3}
										icon={true}
									/>
								)}
								{book.list === 4 && (
									<RemoveBookFromXButton
										book_id={book.id}
										book_list={book.list}
										book_title_short={book.title_short}
										targetList={4}
										icon={true}
									/>
								)}
							</div>
						</>
					)}
				</div>
			</div>
			<footer>
				{(currentPage === 'finished' || currentPage === 'favorites') && ReviewText(book, book.review_text)}
				{(currentPage === 'finished' || currentPage === 'favorites') &&
					ReviewQuote(book, book.review_fav_quote)}
				{currentPage !== 'finished' &&
					currentPage !== 'favorites' &&
					currentPage !== 'quotedbooks' &&
					currentPage !== 'dashboard' && (
						<>
							{currentPage === 'search' && book.subject && SearchTropes(book.id, book.subject)}
							<button
								className={
									isShowingSynopsis
										? 'btn-text caret-right-toggle active'
										: 'btn-text caret-right-toggle'
								}
								onClick={toggleSynopsis}
							>
								{isLoading && 'Loading...'}
								{!isLoading && !isShowingSynopsis && 'Synopsis'}
								{!isLoading && isShowingSynopsis && <b style={{ color: 'black' }}> Synopsis </b>}
							</button>
							<div className="synopsisWrapper" aria-expanded={isShowingSynopsis}>
								<div className="synopsis">
									<br />
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
