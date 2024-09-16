import { useContext, useEffect, useState } from 'react'
import { debounce, openCalendarPopUp } from '../Helpers'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import { convertDate } from '../helpers/convertDate'

const BookStartedFinished = ({
	date_started,
	date_finished,
	book_id,
	list,
}: {
	date_started: Book['date_reading']
	date_finished: Book['date_finished']
	book_id: Book['id']
	list: Book['list']
}) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid, todaysDateInput } = useContext(AppContext)
	const [dateStarted, setDateStarted] = useState<Book['date_reading']>(date_started)
	const [dateFinished, setDateFinished] = useState<Book['date_finished']>(date_finished)
	const [showStartedDate, setShowStartedDate] = useState<boolean>(false)
	const [showFinishedDate, setShowFinishedDate] = useState<boolean>(false)

	useEffect(() => {
		if (date_finished === 0 || date_finished === undefined || date_finished === null) {
			setShowStartedDate(true)
			setShowFinishedDate(false)
		} else {
			setShowStartedDate(false)
			setShowFinishedDate(true)
		}
		/* TODO: this needs some work, there might be (faulty) cases where dateFinished is falsy, but book.list is 3 or 4 */
	}, [date_finished, userMyBooks, date_started, setShowStartedDate, setShowFinishedDate, dateFinished])

	async function MyBooksUpdate(myBooksNew: Books) {
		let msg: string
		setUserMyBooks(myBooksNew)
		const { error } = await supabase
			.from('user_entries')
			.update({ json: myBooksNew })
			.eq('user_id', userid)
			.select()
		if (error) {
			msg = 'Error, date was not changed'
			console.log('error:', error)
		} else msg = 'Changed the date.'
		setPopupNotification(msg)
	}

	function changeDates(fieldName: string, fieldVal: number) {
		if (fieldName === 'date_reading') setDateStarted(fieldVal)
		if (fieldName === 'date_finished') setDateFinished(fieldVal) // TODO: tweak: make else if

		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = userMyBooks
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book_id) {
				if (fieldName === 'date_reading') myBooks[i].date_reading = fieldVal
				if (fieldName === 'date_finished') {
					myBooks[i].date_finished = fieldVal
					if (
						(myBooks[i].date_finished === null ||
							myBooks[i].date_finished === undefined ||
							myBooks[i].date_finished === 0) &&
						myBooks[i].list > 2
					) {
						myBooks[i].list = 2
					}
				}
			}
		}
		const myBooksNew = myBooks
		MyBooksUpdate(myBooksNew)
	}

	function modifyDateReading(field: 'date_reading' | 'date_finished') {
		if (document.getElementById(field + book_id) === null) return
		const inputfield: string = field + book_id
		const newDateArr = (document.getElementById(inputfield) as HTMLInputElement).value.split('-')
		const newDate = parseInt(newDateArr[0] + newDateArr[1] + newDateArr[2], 10)
		changeDates(field, newDate)
	}
	useEffect(() => {
		if (dateStarted && showStartedDate) {
			const eleDateReading = document.getElementById('date_reading' + book_id) as HTMLInputElement | null
			if (eleDateReading !== null) eleDateReading.value = convertDate(dateStarted, 'input')
		}
		if (dateFinished && showFinishedDate) {
			const eleDateFinished = document.getElementById('date_finished' + book_id) as HTMLInputElement | null
			if (eleDateFinished !== null) eleDateFinished.value = convertDate(dateFinished, 'input')
		}
	}, [dateStarted, dateFinished, book_id, showStartedDate, showFinishedDate])

	return (
		<div className="book-started-finished">
			<div>
				<>
					<em className="btn-text">
						<span className="icon icon-reading"></span>
						<button
							className="btn-calendar btn-text"
							onClick={() => openCalendarPopUp('date_reading' + book_id)}
						>
							{dateStarted && convertDate(dateStarted, 'human')}
						</button>
					</em>
					<input
						tabIndex={-1}
						id={'date_reading' + book_id}
						name={'date_reading' + book_id}
						type="date"
						max={todaysDateInput}
						className="calendar-hidden"
						onChange={debounce(() => modifyDateReading('date_reading'), 100)}
					/>
				</>

				{list > 2 && (
					<>
						<em className="btn-text">
							<span className="icon icon-finished"></span>
							<button
								className="btn-calendar btn-text"
								onClick={() => openCalendarPopUp('date_finished' + book_id)}
							>
								{date_finished && convertDate(date_finished, 'human')}
							</button>
						</em>
						<input
							tabIndex={-1}
							id={'date_finished' + book_id}
							name={'date_finished' + book_id}
							type="date"
							min={date_started && convertDate(date_started, 'input')}
							max={todaysDateInput}
							className="calendar-hidden"
							onChange={debounce(() => modifyDateReading('date_finished'), 100)}
						/>
					</>
				)}
			</div>
		</div>
	)
}
export default BookStartedFinished
