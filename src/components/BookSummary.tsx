import AddBookToXButton from './AddBookToXButton'
import RemoveBookFromXButton from './RemoveBookFromXButton'
import BookAuthorList from './BookAuthorList'
import { getBookCover } from '../Helpers'
import { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import convertDate from '../helpers/convertDate'
import { debounce } from '../Helpers'

const BookSummary = ({ book }: BookObject) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)
	const [synopsis, setSynopsis] = useState<string>('')
	const [readingDate, setReadingDate] = useState<string>('')
	const [finishedDate, setFinishedDate] = useState<string>('')
	const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		if (book.date_reading !== undefined) setReadingDate(book.date_reading)
		if (book.date_finished !== undefined) setFinishedDate(book.date_finished)
	}, [book])

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
				msg = 'Changed the date'
			})
			.catch(() => {
				msg = 'Something went wrong, Mu Books are not updated.'
			})
			.finally(() => setPopupNotification(msg))
	}

	function modifyDateReading(field: 'date_reading' | 'date_finished') {
		if (document.getElementById(field + book.id) === null) return
		let newValue: string
		const inputfield: string = field + book.id
		if (inputfield === '') return

		if (document.getElementById(inputfield) !== null) {
			newValue = (document.getElementById(inputfield) as HTMLInputElement).value

			// if (field === 'date_reading') setReadingDate(newValue)
			// if (field === 'date_finished') setFinishedDate(newValue)
			changeDates(field, newValue)
		}
	}

	function changeDates(fieldName: string, fieldVal: string) {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = JSON.parse(userMyBooks as string)
		// if (fieldName === 'date_finished') setFinishedDate(fieldVal)
		// if (fieldName === 'date_reading') setReadingDate(fieldVal)

		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				if (fieldName === 'date_reading') myBooks[i].date_reading = fieldVal
				if (fieldName === 'date_finished') myBooks[i].date_finished = fieldVal
			}
		}

		const myBooksNew: string = JSON.stringify(myBooks)
		MyBooksUpdate(myBooksNew)
	}

	// function showElement(id: string): void {
	// 	document.getElementById(id)?.addEventListener('focus', function() {
	// 		openCalendarPopUp(id)
	// 	})
	// 	// document.getElementById(id)?.classList.toggle('dnone')
	// 	// document.getElementById(id)?.focus()
	// }

	function openCalendarPopUp(dateFieldId: string): void {
		const dateElement = document.getElementById(dateFieldId) as HTMLInputElement
		try {
			dateElement.showPicker()
		} catch (e) {
			dateElement.classList.remove('calendar-hidden')
			dateElement.focus()
			console.error(e)
		}
	}
	return (
		// TODO: add className for when marked as saved
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
						{book.number_of_pages_median && <>{book.number_of_pages_median} pages</>}

						{book.list > 1 && book.date_reading !== undefined && (
							<div style={{ paddingTop: '.5em' }}>
								<em>
									Started:&nbsp;&nbsp;&nbsp;
									<button
										className="btn-calendar btn-text"
										onClick={() => openCalendarPopUp('date_reading' + book.id)}
									>
										{convertDate(readingDate, 'human')}
									</button>
								</em>
								<input
									id={'date_reading' + book.id}
									name={'date_reading' + book.id}
									type="date"
									className="calendar-hidden"
									onChange={debounce(() => modifyDateReading('date_reading'), 800)}
								/>
							</div>
						)}
						{book.list > 2 && book.date_finished !== undefined && (
							<div>
								<em>
									Finished:&nbsp;&nbsp;
									<button
										className="btn-calendar btn-text"
										onClick={() => openCalendarPopUp('date_finished' + book.id)}
									>
										{convertDate(finishedDate, 'human')}
									</button>
								</em>

								<input
									id={'date_finished' + book.id}
									name={'date_finished' + book.id}
									type="date"
									className="calendar-hidden"
									onChange={debounce(() => modifyDateReading('date_finished'), 800)}
								/>
							</div>
						)}
					</div>
				</header>
				<main>
					<div className="marks">
						{/* TODO: build further on new feature; highlight saved books in search view */}
						{!book.list && AddBookToXButton(book, 1)}
						{book.list === 1 && AddBookToXButton(book, 2)}
						{book.list === 2 && AddBookToXButton(book, 3)}
						{book.list === 3 && AddBookToXButton(book, 4)}
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
