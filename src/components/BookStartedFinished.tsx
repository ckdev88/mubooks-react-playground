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
		else if (fieldName === 'date_finished') setDateFinished(fieldVal)

		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = userMyBooks
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book_id) {
				if (fieldName === 'date_reading') myBooks[i].date_reading = fieldVal
				if (fieldName === 'date_finished') {
					myBooks[i].date_finished = fieldVal
					if (myBooks[i].date_finished === null && myBooks[i].list > 2) myBooks[i].list = 2
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
		if (dateStarted) {
			(document.getElementById('date_reading' + book_id) as HTMLInputElement).value = convertDate(
				dateStarted,
				'input'
			)
		}
		if (dateFinished) {
			(document.getElementById('date_finished' + book_id) as HTMLInputElement).value = convertDate(
				dateFinished,
				'input'
			)
		}
	}, [dateStarted, dateFinished, book_id])

	return (
		<div className="book-started-finished">
			<div>
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

				{list > 2 && (
					<>
						<em className="btn-text">
							<span className="icon icon-finished"></span>
							<button
								className="btn-calendar btn-text"
								onClick={() => openCalendarPopUp('date_finished' + book_id)}
							>
								{dateFinished && convertDate(dateFinished, 'human')}
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
							onChange={debounce(() => modifyDateReading('date_finished'), 1000)}
						/>
					</>
				)}
			</div>
		</div>
	)
}
export default BookStartedFinished
