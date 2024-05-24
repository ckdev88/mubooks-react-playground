import { useContext, useState } from 'react'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'

const ReviewRating = (book: Book) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)

	const [reviewStars, setReviewStars] = useState(book.rate_stars)
	const [reviewSpice, setReviewSpice] = useState(book.rate_spice)

	// TODO: move this function to generic helper location
	async function MyBooksUpdate(myBooksNew: Books) {
		let msg: string
		setUserMyBooks(myBooksNew)
		const { error } = await supabase
			.from('user_entries')
			.update({ json: myBooksNew, testdata: 'updated from RateStars n Spice' })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Added rating for ' + book.title_short
		setPopupNotification(msg)
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
		if (type === 'rate_stars') setReviewStars(amount)
		if (type === 'rate_spice') setReviewSpice(amount)

		const newArr: Books = RateStars(book, type, amount)
		setUserMyBooks(newArr)
	}

	const iconClassNameEraser = 'icon icon-eraser'
	const iconClassNameStar = 'icon icon-star'
	const iconClassNameSpice = 'icon icon-spice'
	if (book.rate_stars === undefined) book.rate_stars = 0
	if (book.rate_spice === undefined) book.rate_spice = 0

	return (
		<>
			<div className="rate-stars">
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 0)}>
					<span className={iconClassNameEraser}></span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 1)}>
					<span className={iconClassNameStar + (reviewStars > 0 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 2)}>
					<span className={iconClassNameStar + (reviewStars > 1 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 3)}>
					<span className={iconClassNameStar + (reviewStars > 2 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 4)}>
					<span className={iconClassNameStar + (reviewStars > 3 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 5)}>
					<span className={iconClassNameStar + (reviewStars > 4 ? ' active' : '')}>*</span>
				</button>
			</div>
			<div className="rate-spice">
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 0)}>
					<span className={iconClassNameEraser}></span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 1)}>
					<span className={iconClassNameSpice + (reviewSpice > 0 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 2)}>
					<span className={iconClassNameSpice + (reviewSpice > 1 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 3)}>
					<span className={iconClassNameSpice + (reviewSpice > 2 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 4)}>
					<span className={iconClassNameSpice + (reviewSpice > 3 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 5)}>
					<span className={iconClassNameSpice + (reviewSpice > 4 ? ' active' : '')}>&</span>
				</button>
			</div>
		</>
	)
}
export default ReviewRating
