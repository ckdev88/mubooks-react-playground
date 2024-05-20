import { useContext } from 'react'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'

const RateStarsButton = (book: Book) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)

	// TODO: move this function to generic helper location
	async function MyBooksUpdate(myBooksNew: Books) {
		let msg: string
		setUserMyBooks(myBooksNew)
		// TODO: move updateUser data to seperate table
		await supabase.auth
			.updateUser({
				data: { MyBooks: myBooksNew },
			})
			.then(() => {
				msg = 'Added rating for ' + book.title_short
			})
			.catch(() => {
				msg = 'Something went wrong, Mu Books are not updated.'
			})
			.finally(() => setPopupNotification(msg))
	}

	function RateStars(book: Book, type: 'rate_stars' | 'rate_spice', rating: Scale5) {
		let myBooks: Books
		if (userMyBooks !== undefined) myBooks = userMyBooks
		else myBooks = []

		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book.id) {
				if (type === 'rate_stars') myBooks[i].rate_stars = rating
				if (type === 'rate_spice') myBooks[i].rate_spice = rating
				break
			}
		}

		const myBooksNew: Books = myBooks
		MyBooksUpdate(myBooksNew)
		return myBooksNew
	}

	function RateStarsAct(type: 'rate_stars' | 'rate_spice', amount: Scale5) {
		const newArr: Books = RateStars(book, type, amount)
		setUserMyBooks(newArr)
		console.log('book', book.rate_spice, book.rate_stars)
	}

	const iconClassNameStar = 'icon icon-star'
	const iconClassNameSpice = 'icon icon-spice'
	if (book.rate_stars === undefined) book.rate_stars = 0
	if (book.rate_spice === undefined) book.rate_spice = 0

	return (
		<>
			<div className="rate-stars">
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 1)}>
					<span className={iconClassNameStar + (book?.rate_stars > 0 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 2)}>
					<span className={iconClassNameStar + (book?.rate_stars > 1 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 3)}>
					<span className={iconClassNameStar + (book?.rate_stars > 2 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 4)}>
					<span className={iconClassNameStar + (book?.rate_stars > 3 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 5)}>
					<span className={iconClassNameStar + (book?.rate_stars > 4 ? ' active' : '')}>*</span>
				</button>
			</div>
			<div className="rate-spice">
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 1)}>
					<span className={iconClassNameSpice + (book?.rate_spice > 0 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 2)}>
					<span className={iconClassNameSpice + (book?.rate_spice > 1 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 3)}>
					<span className={iconClassNameSpice + (book?.rate_spice > 2 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 4)}>
					<span className={iconClassNameSpice + (book?.rate_spice > 3 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 5)}>
					<span className={iconClassNameSpice + (book?.rate_spice > 4 ? ' active' : '')}>&</span>
				</button>
			</div>
		</>
	)
}
export default RateStarsButton
