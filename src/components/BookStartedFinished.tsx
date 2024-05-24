import { useContext } from 'react'
import { debounce, openCalendarPopUp } from '../Helpers'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import convertDate from '../helpers/convertDate'

const BookStartedFinished = ({
	date_started,
	date_finished,
	bookid,
	list,
}: {
	date_started: Book['date_reading']
	date_finished: Book['date_finished']
	bookid: Book['id']
	list: Book['list']
}) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)
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
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = userMyBooks
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === bookid) {
				if (fieldName === 'date_reading') myBooks[i].date_reading = fieldVal
				if (fieldName === 'date_finished') myBooks[i].date_finished = fieldVal
			}
		}
		const myBooksNew = myBooks
		MyBooksUpdate(myBooksNew)
	}

	function modifyDateReading(field: 'date_reading' | 'date_finished') {
		if (document.getElementById(field + bookid) === null) return
		const inputfield: string = field + bookid
		console.log('inputfield', inputfield)
		const newDateArr = (document.getElementById(inputfield) as HTMLInputElement).value.split('-')
		const newDate = parseInt(newDateArr[0] + newDateArr[1] + newDateArr[2], 10)
		changeDates(field, newDate)
	}

	return (
		<div className="book-started-finished">
			<div>
				<em>
					Started:&nbsp;&nbsp;
					<button
						className="btn-calendar btn-text"
						onClick={() => openCalendarPopUp('date_reading' + bookid)}
					>
						{date_started && convertDate(date_started, 'human')}
					</button>
				</em>
				<input
					tabIndex={-1}
					id={'date_reading' + bookid}
					name={'date_reading' + bookid}
					type="date"
					className="calendar-hidden"
					onChange={debounce(() => modifyDateReading('date_reading'), 500)}
				/>
			</div>

			{list > 2 && (
				<div>
					<em>
						Finished:&nbsp;&nbsp;
						<button
							className="btn-calendar btn-text"
							onClick={() => openCalendarPopUp('date_finished' + bookid)}
						>
							{date_finished && convertDate(date_finished, 'human')}
						</button>
					</em>
					<input
						tabIndex={-1}
						id={'date_finished' + bookid}
						name={'date_finished' + bookid}
						type="date"
						className="calendar-hidden"
						onChange={debounce(() => modifyDateReading('date_finished'), 1000)}
					/>
				</div>
			)}
		</div>
	)
}
export default BookStartedFinished
