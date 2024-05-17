import AddBookToXButton from './AddBookToXButton'
import BookAuthorList from './BookAuthorList'
import ReactMarkdown from 'react-markdown'
import RemoveBookFromXButton from './RemoveBookFromXButton'
import convertDate from '../helpers/convertDate'
import { AppContext } from '../App'
import { debounce, openCalendarPopUp } from '../Helpers'
import { getBookCover } from '../Helpers'
import { supabase } from '../../utils/supabase'
import { useContext, useState } from 'react'
import RateStarsButton from './RateStars'

const BookSummary = ({ book, page }: { book: Book; page: string }) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)
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

	async function MyBooksUpdate(myBooksNew: string) {
		let msg: string
		setUserMyBooks(myBooksNew)
		await supabase.auth
			.updateUser({
				data: { MyBooks: myBooksNew },
			})
			.then(() => {
				msg = 'Changed the date.'
			})
			.catch(() => {
				msg = 'Something went wrong, Mu Books are not updated.'
			})
			.finally(() => setPopupNotification(msg))
	}

	function modifyDateReading(field: 'date_reading' | 'date_finished') {
		if (document.getElementById(field + book.id) === null) return
		const inputfield: string = field + book.id
		console.log('inputfield', inputfield)
		const newDateArr = (document.getElementById(inputfield) as HTMLInputElement).value.split('-')
		const newDate = parseInt(newDateArr[0] + newDateArr[1] + newDateArr[2], 10)
		changeDates(field, newDate)
	}

	function changeDates(fieldName: string, fieldVal: number) {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = JSON.parse(userMyBooks as string)
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				if (fieldName === 'date_reading') myBooks[i].date_reading = fieldVal
				if (fieldName === 'date_finished') myBooks[i].date_finished = fieldVal
			}
		}
		const myBooksNew: string = JSON.stringify(myBooks)
		MyBooksUpdate(myBooksNew)
	}

	return (
		// TODO: add className for when marked as saved in search results
		<article className="book-summary">
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
			<div className="article-main">
				<header>
					<div className="in-short">
						<h2>
							{book.title_short} <sup>({book.first_publish_year})</sup>
							<sub>{BookAuthorList(book)}</sub>
						</h2>
						{book.number_of_pages_median && page !== 'finishedpage' && page !== 'favoritespage' && (
							<>{book.number_of_pages_median} pages</>
						)}

						{(book.list > 1 && page !=='searchpage') && (
							<div style={{ paddingTop: '.5em' }}>
								<em>
									Started:&nbsp;&nbsp;&nbsp;
									<button
										className="btn-calendar btn-text"
										onClick={() => openCalendarPopUp('date_reading' + book.id)}
									>
										{book.date_reading && convertDate(book.date_reading, 'human')}
									</button>
								</em>
								<input
									tabIndex={-1}
									id={'date_reading' + book.id}
									name={'date_reading' + book.id}
									type="date"
									className="calendar-hidden"
									onChange={debounce(() => modifyDateReading('date_reading'), 500)}
								/>
							</div>
						)}
						{(book.list > 2 && page!=='searchpage') && (
							<div>
								<em>
									Finished:&nbsp;&nbsp;
									<button
										className="btn-calendar btn-text"
										onClick={() => openCalendarPopUp('date_finished' + book.id)}
									>
										{book.date_finished && convertDate(book.date_finished, 'human')}
									</button>
								</em>

								<input
									tabIndex={-1}
									id={'date_finished' + book.id}
									name={'date_finished' + book.id}
									type="date"
									className="calendar-hidden"
									onChange={debounce(() => modifyDateReading('date_finished'), 1000)}
								/>
							</div>
						)}
					</div>
				</header>
				<main>
					<div className="reviews">
						{(page === 'finishedpage' || page === 'favoritespage') && RateStarsButton(book)}
					</div>
					<div className="marks">
						{/* TODO: build further on new feature; highlight saved books in search view */}
						{!book.list && AddBookToXButton(book, 1)}
						{(book.list === 1 || page === 'searchpage') && AddBookToXButton(book, 2)}
						{(book.list === 2 || (page === 'searchpage' && book.list!==3 && book.list!==4)) && AddBookToXButton(book, 3)}
						{(book.list === 3 || page === 'searchpage') && AddBookToXButton(book, 4)}
						{book.list === 1 && RemoveBookFromXButton(book, 1)}
						{book.list === 2 && RemoveBookFromXButton(book, 2)}
						{book.list === 3 && RemoveBookFromXButton(book, 3)}
						{book.list === 4 && RemoveBookFromXButton(book, 4)}
						<button
							className={isShowingSynopsis ? 'btn-text caret-toggle active' : 'btn-text caret-toggle'}
							onClick={toggleSynopsis}
						>
							{isLoading && 'Loading...'}
							{!isLoading && !isShowingSynopsis && 'Read synopsis'}
							{!isLoading && isShowingSynopsis && 'Hide synopsis'}
						</button>
					</div>
				</main>
			</div>
			<footer>
				<div className="synopsisWrapper" aria-expanded={isShowingSynopsis}>
					<div className="synopsis">
						<h3>Synopsis</h3>
						<ReactMarkdown>{synopsis}</ReactMarkdown>
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
